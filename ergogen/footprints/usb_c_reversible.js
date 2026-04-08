// ─────────────────────────────────────────────────────────────────────────────
// HRO TYPE-C-31-M-12  —  USB-C Receptacle (USB 2.0, GND / D+ / D- only)
// Ergogen v4 footprint — KiCad 8+ compatible
//
// Retained signals   : GND (A1/B12/A12/B1), D− (A6/B6), D+ (A7/B7), SH (shell)
// Removed signals    : VBUS, CC1, CC2, SBU1, SBU2
//
// Reversible PCB strategy
//   F.Cu pads use standard A-row X positions.
//   B.Cu pads are X-mirrored so the connector is correct on either board face.
//   THT shield tabs and NPTH locating holes pass through and need no mirroring.
//
// Parameters
//   side        'F'|'B'   which face the component body sits on
//   reversible  bool      true → pads on both Cu layers (default, split KB use)
//   gnd         net       e.g. GND
//   D_minus     net       MCU pin net for D−
//   D_plus      net       MCU pin net for D+
//
// IMPORTANT NOTES ON ROTATION
//   • p.at already encodes (at x y rotation).  Do NOT add p.rot to individual
//     pad (at …) statements — KiCad rotates child elements automatically via
//     the parent footprint's at, and adding p.rot again would double-rotate.
//   • The keepout zone idea from some versions is intentionally omitted: zones
//     embedded in footprints do not transform with footprint placement/rotation
//     in KiCad, so they would always sit at absolute board position (0,0).
//     If you need a keepout, add it as a board-level zone in ergogen's pcb section.
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
    const back       = p.side === 'B'
    const want_front = !back || p.reversible
    const want_back  =  back || p.reversible

    const silk  = back ? 'B.SilkS' : 'F.SilkS'
    const fab   = back ? 'B.Fab'   : 'F.Fab'
    const crtyd = back ? 'B.CrtYd' : 'F.CrtYd'
    const fp_layer = want_front ? 'F.Cu' : 'B.Cu'

    // ── Pad geometry ──────────────────────────────────────────────────────────
    // Y position of all signal pads (connector opening edge).
    const Y = -4.045

    // Width choices:
    //   GND pads: keep at 0.6 mm (datasheet nominal) — wider = better heat sink
    //   Data pads: 0.35 mm (slight increase from 0.3 mm nominal for hand soldering)
    // Height: extended to 2.0 mm (from 1.45 mm nominal) for drag-soldering comfort.
    // Paste reduction and mask expansion are applied uniformly.
    const GND_W  = 0.6
    const DATA_W = 0.35
    const PAD_H  = 2.0

    // Paste/mask tweaks — applied as pad-level overrides.
    // Negative paste margin slightly reduces paste area to avoid bridging.
    // Positive mask margin adds a little clearance around the pad.
    const paste_mask = `(solder_paste_margin -0.05) (solder_mask_margin 0.03)`

    // ── SMD pad builder ───────────────────────────────────────────────────────
    // NOTE: no rotation in (at x y) — the footprint's p.at handles that.
    const net_str = name =>
      name === 'GND'     ? p.gnd.str
      : name === 'D_minus' ? p.D_minus.str
      : p.D_plus.str

    const smd = (name, cu, x, y, w, h) =>
      `(pad "${name}" smd roundrect
        (at ${x} ${y})
        (size ${w} ${h})
        (layers "${cu}.Cu" "${cu}.Mask" "${cu}.Paste")
        (roundrect_rratio 0.25)
        ${paste_mask}
        ${net_str(name)})`

    // ── Signal pad layout ─────────────────────────────────────────────────────
    //
    // F.Cu (connector on front face)      B.Cu (connector on back face / flipped)
    //  GND    x = −3.25                    GND    x = +3.25   ← mirrored
    //  D−     x = −0.25                    D−     x = +0.25
    //  D+     x = −0.75                    D+     x = +0.75
    //  D+     x = +0.25                    D+     x = −0.25
    //  D−     x = +0.75                    D−     x = −0.75
    //  GND    x = +3.25                    GND    x = −3.25
    //
    // (A6/B6 both route to D−; A7/B7 both route to D+; duplicated for robustness)

    const f_pads = want_front ? `
    ${smd('GND',     'F', -3.25, Y, GND_W,  PAD_H)}
    ${smd('GND',     'F',  3.25, Y, GND_W,  PAD_H)}
    ${smd('D_minus', 'F', -0.25, Y, DATA_W, PAD_H)}
    ${smd('D_minus', 'F',  0.75, Y, DATA_W, PAD_H)}
    ${smd('D_plus',  'F',  0.25, Y, DATA_W, PAD_H)}
    ${smd('D_plus',  'F', -0.75, Y, DATA_W, PAD_H)}` : ''

    const b_pads = want_back ? `
    ${smd('GND',     'B',  3.25, Y, GND_W,  PAD_H)}
    ${smd('GND',     'B', -3.25, Y, GND_W,  PAD_H)}
    ${smd('D_minus', 'B',  0.25, Y, DATA_W, PAD_H)}
    ${smd('D_minus', 'B', -0.75, Y, DATA_W, PAD_H)}
    ${smd('D_plus',  'B', -0.25, Y, DATA_W, PAD_H)}
    ${smd('D_plus',  'B',  0.75, Y, DATA_W, PAD_H)}` : ''

    // ── Shield / shell THT pads ───────────────────────────────────────────────
    // Wired to GND. Through-hole — inherently both-sided, no mirroring needed.
    // remove_unused_layers no → keep copper on all layers (GND plane stitching).
    // No rotation in (at …) — see note above.
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

    // ── NPTH locating holes ───────────────────────────────────────────────────
    const npth = `
    (pad "" np_thru_hole circle
      (at -2.89 -2.6) (size 0.65 0.65) (drill 0.65)
      (layers "*.Cu" "*.Mask"))
    (pad "" np_thru_hole circle
      (at  2.89 -2.6) (size 0.65 0.65) (drill 0.65)
      (layers "*.Cu" "*.Mask"))`

    // ── Silkscreen ────────────────────────────────────────────────────────────
    // Split rails avoid the pad area (y < −1.9) + top closing bar.
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

    // ── Fabrication outline ───────────────────────────────────────────────────
    const fab_outline = `
    (fp_line (start -4.47 -3.65) (end  4.47 -3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start  4.47 -3.65) (end  4.47  3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start  4.47  3.65) (end -4.47  3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))
    (fp_line (start -4.47  3.65) (end -4.47 -3.65)
      (stroke (width 0.1) (type solid)) (layer "${fab}"))`

    return `
  (footprint "HRO_TYPE-C-31-M-12_USB2_Reversible"
    (layer "${fp_layer}")
    ${p.at}
    (attr smd)
    (descr "HRO TYPE-C-31-M-12 USB-C receptacle, USB 2.0 GND/D+/D- only, reversible PCB")
    (tags "usb usb-c 2.0 reversible split keyboard")

    (property "Reference" "${p.ref}"
      (at 0 -5.645)
      (layer "${silk}")
      (effects (font (size 1 1) (thickness 0.15))))
    (property "Value" "HRO_TYPE-C-31-M-12"
      (at 0 5.1)
      (layer "${fab}")
      (effects (font (size 1 1) (thickness 0.15))))

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
