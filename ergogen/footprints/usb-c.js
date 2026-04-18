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

module.exports = {
  params: {
    designator: 'USB',
    GND:    { type: 'net', value: 'GND' },
    DPLUS:  { type: 'net', value: 'D+' },
    DMINUS: { type: 'net', value: 'D-' },
  },

  body: p => {
    const gnd = p.net.GND
    const dp  = p.net.DPLUS
    const dm  = p.net.DMINUS

    return `
    (footprint "USB-C-SHOU_TYPE-C-16P-REVERSIBLE"
      (layer "F.Cu")
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

      (fp_line (start -4.47 -1.82) (end  4.47 -1.82) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47 -1.82) (end  4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -1.82) (layer "F.CrtYd") (width 0.05))

      (fp_line (start -4.47 -1.82) (end  4.47 -1.82) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47 -1.82) (end  4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -1.82) (layer "B.CrtYd") (width 0.05))

      ${''/* ── F.Cu SMD pads ─────────────────────────────────────── */}
      ${''/* A1  — GND (outer left)  */}
      (pad "A1"  smd rect (at -3.35 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* B12 — GND (inner left)  */}
      (pad "B12" smd rect (at -3.05 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* B1  — GND (inner right) */}
      (pad "B1"  smd rect (at  3.05 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* A12 — GND (outer right) */}
      (pad "A12" smd rect (at  3.35 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* B7  — D+ (plug flipped) */}
      (pad "B7"  smd rect (at -0.75 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${dp.index}  "${dp.name}"))
      ${''/* A6  — D+ (plug normal)  */}
      (pad "A6"  smd rect (at -0.25 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${dp.index}  "${dp.name}"))
      ${''/* A7  — D- (plug normal)  */}
      (pad "A7"  smd rect (at  0.25 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${dm.index}  "${dm.name}"))
      ${''/* B6  — D- (plug flipped) */}
      (pad "B6"  smd rect (at  0.75 -2.225 ${p.r}) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") (net ${dm.index}  "${dm.name}"))

      ${''/* ── B.Cu SMD pads (mirrored) ──────────────────────────── */}
      ${''/* B1  — GND */}
      (pad "B1"  smd rect (at -3.05 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* A12 — GND */}
      (pad "A12" smd rect (at -3.35 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* A1  — GND */}
      (pad "A1"  smd rect (at  3.35 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* B12 — GND */}
      (pad "B12" smd rect (at  3.05 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${gnd.index} "${gnd.name}"))
      ${''/* A6  — D+ */}
      (pad "A6"  smd rect (at  0.25 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${dp.index}  "${dp.name}"))
      ${''/* B7  — D+ */}
      (pad "B7"  smd rect (at  0.75 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${dp.index}  "${dp.name}"))
      ${''/* A7  — D- */}
      (pad "A7"  smd rect (at -0.25 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${dm.index}  "${dm.name}"))
      ${''/* B6  — D- */}
      (pad "B6"  smd rect (at -0.75 -2.225 ${p.r}) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") (net ${dm.index}  "${dm.name}"))

      ${''/* ── Shield / mounting holes (GND) ────────────────────── */}
      ${''/* Oval thru-hole pads: both size and drill are oval,      */}
      ${''/* so ${p.r} is needed on both the pad at and the drill.   */}
      (pad "S1" thru_hole oval (at  5.62  2.58 ${p.r}) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") (net ${gnd.index} "${gnd.name}"))
      (pad "S1" thru_hole oval (at  5.62 -1.42 ${p.r}) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") (net ${gnd.index} "${gnd.name}"))
      (pad "S1" thru_hole oval (at -5.62  2.58 ${p.r}) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") (net ${gnd.index} "${gnd.name}"))
      (pad "S1" thru_hole oval (at -5.62 -1.42 ${p.r}) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") (net ${gnd.index} "${gnd.name}"))
    )
    `
  }
}
