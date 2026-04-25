// Ergogen footprint: USB-C-SHOU TYPE-C-16P-REVERSIBLE
// LCSC C2906290 — mid-mount, reversible, GND + D+/D- only.
//
// This connector is always soldered on both F.Cu and B.Cu simultaneously
// (mid-mount reversible), so pads appear on both copper layers regardless
// of placement side.
//
// Net params:
//   GND    — pins A1, B1, A12, B12 (corner GND) + MP1-MP4 shield tabs
//   DPLUS  — pins A6 (F.Cu) / B7 (F.Cu) / A6 (B.Cu) / B7 (B.Cu)
//   DMINUS — pins A7 (F.Cu) / B6 (F.Cu) / A7 (B.Cu) / B6 (B.Cu)
//
// ── Coordinate system ──────────────────────────────────────────────────
//   Y negative = toward PCB edge / connector opening (past Edge.Cuts)
//   Y positive = into PCB interior
//   PCB edge (Edge.Cuts) runs at Y ≈ -2.225 mm in footprint space.
//
// ── Signal pad geometry (from datasheet LCSC C2906290) ─────────────────
//   Datasheet pad center:  0.72 mm from PCB edge (into PCB)
//   Datasheet pad length:  1.20 mm
//   This footprint:
//     Center Y = -1.725  (= PCB edge -2.225 + 0.5 mm bias into PCB)
//     Length   = 2.50 mm
//     → 1.75 mm on PCB side  (contact at 0.72 mm from edge, 1.03 mm margin ✓)
//     → 0.75 mm past edge    (accessible at board edge for drag soldering ✓)
//   Width extended to 0.30 mm (vs 0.20 mm spec) for easier hand soldering.
//
// ── Shield / mounting pads (from datasheet top view) ───────────────────
//   4× SMD oval, GND.
//   X: ±4.62 mm  (= 9.24 mm tab span / 2)
//   Y: +1.775 mm and +2.375 mm
//     (= PCB edge -2.225 + 4.00 mm and + 4.60 mm from datasheet)
//   Size: 2.20 × 0.80 mm  (datasheet 1.80 × 0.60 mm + 0.4 mm solder relief)
//
// ── Previous shield pads (WRONG — from a different connector) ──────────
//   Old: thru_hole oval at X=±5.62 mm — does NOT match this connector.
//   This connector has SMD-only tabs; no through-hole legs.
//
// Rotation note: all pads include ${p.r} in their (at ...) so KiCad
// rotates pad shapes correctly when the footprint is placed at a non-zero angle.

module.exports = {
  params: {
    designator: 'USB',
    GND:    { type: 'net', value: 'GND' },
    DPLUS:  { type: 'net', value: 'D+' },
    DMINUS: { type: 'net', value: 'D-' },
  },

  body: p => {
    const gnd = p.GND.str
    const dp  = p.DPLUS.str
    const dm  = p.DMINUS.str

    return `
    (footprint "USB-C-SHOU_TYPE-C-16P-REVERSIBLE"
      (layer "F.Cu")
      ${p.at}
      (descr "Mid-mount USB-C, SHOU HAN TYPE-C-16P-CB1.6 073, LCSC C2906290. GND+D+/D- only, reversible F.Cu+B.Cu. Pads 2.5mm long: 1.75mm on PCB, 0.75mm past edge for drag soldering.")
      (tags "USB-C mid-mount reversible SHOU-HAN C2906290")

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

      ${''/* ── Outline / courtyard ───────────────────────────────────── */}

      ${''/* Cmts.User: full connector body including overhang past PCB edge */}
      (fp_line (start -4.45 -1.82) (end 4.55 -1.82) (layer "Cmts.User") (width 0.25))
      (fp_line (start  4.55 -1.82) (end 4.55  4.78) (layer "Cmts.User") (width 0.25))
      (fp_line (start -4.45 -1.82) (end -4.45 4.78) (layer "Cmts.User") (width 0.25))

      ${''/* Silkscreen on both faces */}
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

      ${''/* PCB edge reference line on Fab — align your Edge.Cuts to this */}
      (fp_line (start -4.97 -2.225) (end 4.97 -2.225) (layer "F.Fab") (width 0.10))

      (fp_line (start -4.47 -1.82) (end  4.47 -1.82) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47 -1.82) (end  4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -1.82) (layer "F.CrtYd") (width 0.05))

      (fp_line (start -4.47 -1.82) (end  4.47 -1.82) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47 -1.82) (end  4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -1.82) (layer "B.CrtYd") (width 0.05))

      ${''/* ── F.Cu SMD signal pads ──────────────────────────────────── */}
      ${''/* Center Y = -1.725 | size 0.30 × 2.50 mm                     */}
      ${''/* → 1.75 mm on PCB, 0.75 mm past edge for drag soldering       */}

      ${''/* A1  — GND (outer left)  */}
      (pad "A1"  smd rect (at -3.35 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* B12 — GND (inner left)  */}
      (pad "B12" smd rect (at -3.05 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* B7  — D+ (plug flipped) */}
      (pad "B7"  smd rect (at -0.75 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${dp})
      ${''/* A6  — D+ (plug normal)  */}
      (pad "A6"  smd rect (at -0.25 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${dp})
      ${''/* A7  — D- (plug normal)  */}
      (pad "A7"  smd rect (at  0.25 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${dm})
      ${''/* B6  — D- (plug flipped) */}
      (pad "B6"  smd rect (at  0.75 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${dm})
      ${''/* B1  — GND (inner right) */}
      (pad "B1"  smd rect (at  3.05 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      ${''/* A12 — GND (outer right) */}
      (pad "A12" smd rect (at  3.35 -1.725 ${p.r}) (size 0.30 2.50) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})

      ${''/* ── B.Cu SMD signal pads (X-mirrored for reversible) ─────── */}
      ${''/* Same Y and size as F.Cu. X positions are mirrored so the     */}
      ${''/* net assignment is correct when board is viewed from underside.*/}

      ${''/* B1  — GND (inner left  when viewed from back) */}
      (pad "B1"  smd rect (at -3.05 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* A12 — GND (outer left  when viewed from back) */}
      (pad "A12" smd rect (at -3.35 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* A7  — D- (plug normal, mirrored) */}
      (pad "A7"  smd rect (at -0.25 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${dm})
      ${''/* B6  — D- (plug flipped, mirrored) */}
      (pad "B6"  smd rect (at -0.75 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${dm})
      ${''/* A6  — D+ (plug normal, mirrored) */}
      (pad "A6"  smd rect (at  0.25 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${dp})
      ${''/* B7  — D+ (plug flipped, mirrored) */}
      (pad "B7"  smd rect (at  0.75 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${dp})
      ${''/* A1  — GND (inner right when viewed from back) */}
      (pad "A1"  smd rect (at  3.35 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})
      ${''/* B12 — GND (outer right when viewed from back) */}
      (pad "B12" smd rect (at  3.05 -1.725 ${p.r}) (size 0.30 2.50) (layers "B.Cu" "B.Paste" "B.Mask") ${gnd})

      ${''/* ── Mounting / shield pads (SMD, GND) ────────────────────── */}
      ${''/* 4× oval SMD on F.Cu only (connector sits on F.Cu side).      */}
      ${''/* X: ±4.62 mm  (9.24 mm tab span / 2, from datasheet top view) */}
      ${''/* Y: +1.775 mm = PCB edge(-2.225) + 4.00 mm tab from edge      */}
      ${''/*    +2.375 mm = PCB edge(-2.225) + 4.60 mm tab from edge      */}
      ${''/* Size: 2.20 × 0.80 mm (datasheet 1.80×0.60 + 0.40 solder      */}
      ${''/*        relief; verify against physical part before fab)        */}
      ${''/* IMPORTANT: these replaced incorrect thru_hole pads at ±5.62   */}
      ${''/*   which did not match this connector's geometry.              */}

      (pad "MP1" smd oval (at -4.62  1.775 ${p.r}) (size 2.20 0.80) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      (pad "MP2" smd oval (at  4.62  1.775 ${p.r}) (size 2.20 0.80) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      (pad "MP3" smd oval (at -4.62  2.375 ${p.r}) (size 2.20 0.80) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
      (pad "MP4" smd oval (at  4.62  2.375 ${p.r}) (size 2.20 0.80) (layers "F.Cu" "F.Paste" "F.Mask") ${gnd})
    )
    `
  }
}
