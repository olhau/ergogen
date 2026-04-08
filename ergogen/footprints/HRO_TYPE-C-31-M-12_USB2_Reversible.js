// ─────────────────────────────────────────────────────────────────────────────
// HRO TYPE-C-31-M-12  —  USB-C Receptacle (USB 2.0, GND / D+ / D- only)
// Ergogen v2 footprint — KiCad 8 compatible
//
// Stripped signals (vs full USB-C pinout):
//   KEPT   : GND  (A1 / B12 / A12 / B1)
//             D-   (A6 / B6)
//             D+   (A7 / B7)
//             SH   shield tabs — connected to GND
//   REMOVED: VBUS (A4 / B9 / A9 / B4)
//             CC1  (A5) · CC2  (B8) · SBU1 (B5) · SBU2 (A8)
//
// Reversible PCB logic (split-keyboard use case)
//   • F.Cu pads use the standard row-A/row-B X positions.
//   • B.Cu pads are the X-mirror of those, so that the connector is correct
//     whichever side of the board it is soldered on.
//   • Through-hole SH tabs and NPTH locating holes go through the board and
//     therefore need no mirroring.
//
// Parameters
//   side       'F' | 'B'   which PCB side the component body sits on
//                           (controls silk / fab / courtyard layer names)
//   reversible true | false when true, pads are generated on BOTH Cu layers;
//                           when false, only the 'side' Cu layer is populated
//   gnd        net           MCU net for ground
//   D_minus    net           MCU net for USB D−
//   D_plus     net           MCU net for USB D+
//
// Usage example in ergogen YAML
//   usb:
//     what: HRO_TYPE-C-31-M-12_USB2_Reversible
//     where: …
//     params:
//       side: F
//       reversible: true
//       gnd: GND
//       D_minus: P0_13       # MCU pin connected to D−
//       D_plus:  P0_15       # MCU pin connected to D+
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  params: {
    designator: 'USB',
    side:        'F',
    reversible:  true,
    gnd:     { type: 'net', value: 'GND'     },
    D_minus: { type: 'net', value: 'D_minus' },
    D_plus:  { type: 'net', value: 'D_plus'  },
  },

  body: p => {
    const reversible = p.reversible
    const back       = p.side === 'B'

    // ── Graphic layers follow the component side ──────────────────────────────
    const silk  = back ? 'B.SilkS' : 'F.SilkS'
    const fab   = back ? 'B.Fab'   : 'F.Fab'
    const crtyd = back ? 'B.CrtYd' : 'F.CrtYd'

    // ── Which copper layers to populate ──────────────────────────────────────
    // Non-reversible: only the chosen side.
    // Reversible    : always both (the main use-case for split keyboards).
    const want_front = !back || reversible
    const want_back  = back  || reversible

    // ── Footprint primary layer ───────────────────────────────────────────────
    // KiCad needs a primary layer; use B.Cu only when the footprint is purely
    // back-side (non-reversible, side='B').
    const fp_layer = want_front ? 'F.Cu' : 'B.Cu'

    // ── SMD pad helpers ───────────────────────────────────────────────────────
    // All coordinates are in footprint-local space.
    // KiCad applies the footprint rotation (from p.at) to everything.
    //
    // Pad layout at y = -4.045 (connector opening at negative Y)
    //
    //   F.Cu (connector on front)      B.Cu (connector on back, board flipped)
    //   ─────────────────────────      ──────────────────────────────────────
    //   A1  GND  x = -3.25             GND  x = +3.25   (mirror of A1)
    //   A6  D-   x = -0.25             D-   x = +0.25   (mirror of A6)
    //   B7  D+   x = -0.75             D+   x = +0.75   (mirror of B7)
    //   A7  D+   x = +0.25             D+   x = -0.25   (mirror of A7)
    //   B6  D-   x = +0.75             D-   x = -0.75   (mirror of B6)
    //   A12 GND  x = +3.25             GND  x = -3.25   (mirror of A12)
    //
    //  (B12 and B1 share positions with A1/A12 → single merged GND pad each)

    const Y_PAD = -4.045

    const smd_pad = (name, cu_layer, mask_layer, paste_layer, x, y, w, h, net) =>
      `(pad "${name}" smd roundrect
        (at ${x} ${y})
        (size ${w} ${h})
        (layers "${cu_layer}" "${mask_layer}" "${paste_layer}")
        (roundrect_rratio 0.25)
        ${net})`

    const f_pad = (name, x, y, w, h, net) =>
      smd_pad(name, 'F.Cu', 'F.Mask', 'F.Paste', x, y, w, h, net)

    const b_pad = (name, x, y, w, h, net) =>
      smd_pad(name, 'B.Cu', 'B.Mask', 'B.Paste', x, y, w, h, net)

    // ── F.Cu signal pads ─────────────────────────────────────────────────────
    const f_pads = want_front ? `
    ${f_pad('GND',     -3.25, Y_PAD, 0.6, 1.45, p.gnd.str)}
    ${f_pad('GND',      3.25, Y_PAD, 0.6, 1.45, p.gnd.str)}
    ${f_pad('D_minus', -0.25, Y_PAD, 0.3, 1.45, p.D_minus.str)}
    ${f_pad('D_minus',  0.75, Y_PAD, 0.3, 1.45, p.D_minus.str)}
    ${f_pad('D_plus',   0.25, Y_PAD, 0.3, 1.45, p.D_plus.str)}
    ${f_pad('D_plus',  -0.75, Y_PAD, 0.3, 1.45, p.D_plus.str)}` : ''

    // ── B.Cu signal pads (X-mirrored) ────────────────────────────────────────
    const b_pads = want_back ? `
    ${b_pad('GND',      3.25, Y_PAD, 0.6, 1.45, p.gnd.str)}
    ${b_pad('GND',     -3.25, Y_PAD, 0.6, 1.45, p.gnd.str)}
    ${b_pad('D_minus',  0.25, Y_PAD, 0.3, 1.45, p.D_minus.str)}
    ${b_pad('D_minus', -0.75, Y_PAD, 0.3, 1.45, p.D_minus.str)}
    ${b_pad('D_plus',  -0.25, Y_PAD, 0.3, 1.45, p.D_plus.str)}
    ${b_pad('D_plus',   0.75, Y_PAD, 0.3, 1.45, p.D_plus.str)}` : ''

    // ── Shield / shell through-hole pads (GND, inherently both-sided) ─────────
    // Dimensions from the new KiCad 10 file:
    //   Large oval (bottom) : 1 × 2.1  drill oval 0.6 × 1.7  at y = -3.13
    //   Small oval (top)    : 1 × 1.6  drill oval 0.6 × 1.2  at y =  1.05
    const sh_pads = `
    (pad "SH" thru_hole oval
      (at -4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7)
      (layers "*.Cu" "*.Mask") (remove_unused_layers no)
      ${p.gnd.str})
    (pad "SH" thru_hole oval
      (at  4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7)
      (layers "*.Cu" "*.Mask") (remove_unused_layers no)
      ${p.gnd.str})
    (pad "SH" thru_hole oval
      (at -4.32  1.05) (size 1 1.6) (drill oval 0.6 1.2)
      (layers "*.Cu" "*.Mask") (remove_unused_layers no)
      ${p.gnd.str})
    (pad "SH" thru_hole oval
      (at  4.32  1.05) (size 1 1.6) (drill oval 0.6 1.2)
      (layers "*.Cu" "*.Mask") (remove_unused_layers no)
      ${p.gnd.str})`

    // ── NPTH locating / alignment holes (no copper, no net) ──────────────────
    const npth = `
    (pad "" np_thru_hole circle
      (at -2.89 -2.6) (size 0.65 0.65) (drill 0.65)
      (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle
      (at  2.89 -2.6) (size 0.65 0.65) (drill 0.65)
      (layers "*.Cu" "*.Mask"))`

    // ── Silkscreen ────────────────────────────────────────────────────────────
    // Partial side rails (avoiding the pad area at y < -1.9) + top bar
    const silk_lines = `
    (fp_line (start -4.7 -1.9) (end -4.7  0.1)
      (stroke (width 0.12) (type solid)) (layer "${silk}"))
    (fp_line (start -4.7  2.0) (end -4.7  3.9)
      (stroke (width 0.12) (type solid)) (layer "${silk}"))
    (fp_line (start -4.7  3.9) (end  4.7  3.9)
      (stroke (width 0.12) (type solid)) (layer "${silk}"))
    (fp_line (start  4.7 -1.9) (end  4.7  0.1)
      (stroke (width 0.12) (type solid)) (layer "${silk}"))
    (fp_line (start  4.7  2.0) (end  4.7  3.9)
      (stroke (width 0.12) (type solid)) (layer "${silk}"))`

    // ── Courtyard ─────────────────────────────────────────────────────────────
    const courtyard = `
    (fp_line (start -5.32 -5.27) (end  5.32 -5.27)
      (stroke (width 0.05) (type solid)) (layer "${crtyd}"))
    (fp_line (start  5.32 -5.27) (end  5.32  4.15)
      (stroke (width 0.05) (type solid)) (layer "${crtyd}"))
    (fp_line (start  5.32  4.15) (end -5.32  4.15)
      (stroke (width 0.05) (type solid)) (layer "${crtyd}"))
    (fp_line (start -5.32  4.15) (end -5.32 -5.27)
      (stroke (width 0.05) (type solid)) (layer "${crtyd}"))`

    // ── Fabrication layer outline ──────────────────────────────────────────────
    const fab_outline = `
    (fp_line (start -4.47 -3.65) (end  4.47 -3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start  4.47 -3.65) (end  4.47  3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start  4.47  3.65) (end -4.47  3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start -4.47  3.65) (end -4.47 -3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))`

    // ── Assemble and return the full footprint ─────────────────────────────────
    return `
  (footprint "HRO_TYPE-C-31-M-12_USB2_Reversible"
    (layer "${fp_layer}")
    ${p.at}
    (attr smd)
    (duplicate_pad_numbers_are_jumpers no)
    (descr "HRO TYPE-C-31-M-12 USB-C receptacle — USB 2.0 GND/D+/D- only, reversible PCB")
    (tags "usb usb-c 2.0 reversible split keyboard")

    (property "Reference" "${p.ref}"
      (at 0 -5.645 0)
      (layer "${silk}")
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (property "Value" "HRO_TYPE-C-31-M-12"
      (at 0 5.1 0)
      (layer "${fab}")
      (effects (font (size 1 1) (thickness 0.15)))
    )

    ${silk_lines}
    ${courtyard}
    ${fab_outline}
    ${f_pads}
    ${b_pads}
    ${sh_pads}
    ${npth}
  )`
  }
}
