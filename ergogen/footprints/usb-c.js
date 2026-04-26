// Ergogen footprint: USB-C-SHOU TYPE-C-16P-REVERSIBLE
// LCSC C2906290 — mid-mount, reversible, GND + D+/D- only.
//
// This connector is always soldered on both F.Cu and B.Cu simultaneously
// (mid-mount reversible), so pads appear on both copper layers regardless
// of placement side.
//
// Net params:
//   GND    — pins A1, B1, A12, B12 (corner GND) + S1 shield tabs
//   DPLUS  — pins A6 (F.Cu) / B7 (F.Cu) / A6 (B.Cu) / B7 (B.Cu)
//   DMINUS — pins A7 (F.Cu) / B6 (F.Cu) / A7 (B.Cu) / B6 (B.Cu)
//
// Rotation note: all rect pads and oval thru-hole pads include ${p.r}
// in their (at ...) so KiCad rotates the pad shape correctly when the
// footprint is placed at a non-zero angle.
//
// Pad geometry note:
//   The physical connector housing lip extends roughly 0.9 mm past the
//   connector body outline, covering the inner half of the original 1.8 mm
//   pads and leaving only ~0.9 mm of solderable land — marginal for drag
//   soldering by hand.
//
//   Fix: the pad inner edge (connector side) is kept at its original
//   position; the outer edge is extended further into the PCB to give
//   ~2 mm of exposed land.  Concretely:
//     • pad height:  1.8 mm  →  3.0 mm
//     • pad center Y: -2.225  →  -2.825   (shift of -0.6 mm)
//   The courtyard top edge is updated to -4.5 to encompass the new pads.

module.exports = {
  params: {
    designator: 'USB',
    GND:    { type: 'net', value: 'GND' },
    DPLUS:  { type: 'net', value: 'D+' },
    DMINUS: { type: 'net', value: 'D-' },
  },

  body: p => {
    // p.NET.str is the complete KiCad (net INDEX "NAME") string ergogen provides
    const gnd = p.GND.str
    const dp  = p.DPLUS.str
    const dm  = p.DMINUS.str

    return `
    (footprint "USB-C-SHOU_TYPE-C-16P-REVERSIBLE"
      (layer "F.Cu")
      ${p.at}
      (descr "Mid-mount USB-C, SHOU TYPE-C-16P-CB1.6, LCSC C2906290. GND+D+/D- only, reversible F.Cu+B.Cu, extended pads for drag soldering.")
      (tags "USB-C mid-mount reversible")

      (property "Reference" "${p.ref}"
        (at 0 3.5)
        (layer "F.Fab")
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (property "Value" "USB-C-SHOU_TYPE-C-16P-REVERSIBLE"
        (at 0 5.5)
        (layer "F.Fab")
        (effects (font (size 1 1) (thickness 0.15)))
      )

      ${''/* ── Outline / courtyard ───────────────────────────────── */}

      (fp_line (start -4.45 -1.82) (end 4.55 -1.82) (layer "Cmts.User") (width 0.25))
      (fp_line (start  4.55 -1.82) (end 4.55  4.78) (layer "Cmts.User") (width 0.25))
      (fp_line (start -4.45 -1.82) (end -4.45 4.78) (layer "Cmts.User") (width 0.25))

      (fp_line (start -4.47 -1.83) (end  4.47 -1.83) (layer "F.SilkS") (width 0.25))
      (fp_line (start  4.47 -1.83) (end  4.47  4.67) (layer "F.SilkS") (width 0.25))
      (fp_line (start  4.47  4.67) (end -4.47  4.67) (layer "F.SilkS") (width 0.25))
      (fp_line (start -4.47  4.67) (end -4.47 -1.83) (layer "F.SilkS") (width 0.25))

      (fp_line (start -4.47 -1.83) (end  4.47 -1.83) (layer "B.SilkS") (width 0.25))
      (fp_line (start  4.47 -1.83) (end  4.47  4.67) (layer "B.SilkS") (width 0.25))
      (fp_line (start  4.47  4.67) (end -4.47  4.67) (layer "B.SilkS") (width 0.25))
      (fp_line (start -4.47  4.67) (end -4.47 -1.83) (layer "B.SilkS") (width 0.25))

      (fp_line (start -4.47 -1.83) (end  4.47 -1.83) (layer "F.Fab") (width 0.10))
      (fp_line (start  4.47 -1.83) (end  4.47  4.67) (layer "F.Fab") (width 0.10))
      (fp_line (start  4.47  4.67) (end -4.47  4.67) (layer "F.Fab") (width 0.10))
      (fp_line (start -4.47  4.67) (end -4.47 -1.83) (layer "F.Fab") (width 0.10))

      ${''/* Courtyard extended to -4.5 to cover the longer pads */}
      (fp_line (start -4.47 -4.50) (end  4.47 -4.50) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47 -4.50) (end  4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -4.50) (layer "F.CrtYd") (width 0.05))

      (fp_line (start -4.47 -4.50) (end  4.47 -4.50) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47 -4.50) (end  4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -4.50) (layer "B.CrtYd") (width 0.05))

      ${''/* ── F.Cu SMD pads ─────────────────────────────────────── */}
      ${''/* Pad height extended from 1.8 to 3.0 mm; center shifted  */}
      ${''/* from -2.225 to -2.825 so the connector-side inner edge  */}
      ${''/* stays at y = -1.325, and the exposed land grows from     */}
      ${''/* ~0.9 mm to ~2.0 mm for comfortable drag soldering.       */}
      ${''/* A1  — GND (outer left)  */}
      (pad "A1"  smd rect (at -3.35 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* B12 — GND (inner left)  */}
      (pad "B12" smd rect (at -3.05 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* B1  — GND (inner right) */}
      (pad "B1"  smd rect (at  3.05 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* A12 — GND (outer right) */}
      (pad "A12" smd rect (at  3.35 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* B7  — D+ (plug flipped) */}
      (pad "B7"  smd rect (at -0.75 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${dp})
      ${''/* A6  — D+ (plug normal)  */}
      (pad "A6"  smd rect (at -0.25 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${dp})
      ${''/* A7  — D- (plug normal)  */}
      (pad "A7"  smd rect (at  0.25 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${dm})
      ${''/* B6  — D- (plug flipped) */}
      (pad "B6"  smd rect (at  0.75 -2.825 ${p.r}) (size 0.3 3.0) (layers "F.Cu" "F.Paste" "F.Mask") ${dm})

      ${''/* ── B.Cu SMD pads (mirrored) ──────────────────────────── */}
      ${''/* B1  — GND */}
      (pad "B1"  smd rect (at -3.05 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* A12 — GND */}
      (pad "A12" smd rect (at -3.35 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* A1  — GND */}
      (pad "A1"  smd rect (at  3.35 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* B12 — GND */}
      (pad "B12" smd rect (at  3.05 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* A6  — D+ */}
      (pad "A6"  smd rect (at  0.25 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${dp})
      ${''/* B7  — D+ */}
      (pad "B7"  smd rect (at  0.75 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${dp})
      ${''/* A7  — D- */}
      (pad "A7"  smd rect (at -0.25 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${dm})
      ${''/* B6  — D- */}
      (pad "B6"  smd rect (at -0.75 -2.825 ${p.r}) (size 0.3 3.0) (layers "B.Cu" "B.Paste" "B.Mask") ${dm})

      ${''/* ── Shield / mounting holes (GND) ────────────────────── */}
      ${''/* Oval thru-hole pads: both size and drill are oval,      */}
      ${''/* so ${p.r} is needed on both the pad at and the drill.   */}
      (pad "S1" thru_hole oval (at  5.62  2.58 ${p.r}) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") ${gnd})
      (pad "S1" thru_hole oval (at  5.62 -1.42 ${p.r}) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") ${gnd})
      (pad "S1" thru_hole oval (at -5.62  2.58 ${p.r}) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") ${gnd})
      (pad "S1" thru_hole oval (at -5.62 -1.42 ${p.r}) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") ${gnd})
    )
    `
  }
}
