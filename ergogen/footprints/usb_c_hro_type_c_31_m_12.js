// HRO TYPE-C-31-M-12 USB-C Receptacle
// Reversible, No SBU variant (tzarc/reversible-kicad)
//
// Intended use: split keyboard inter-half UART connection
//   - D+ (A6/B7) and D- (A7/B6) routed to MCU UART TX/RX
//   - VBUS (A4/B4) left unconnected — do NOT power from inter-half cable
//   - CC1/CC2 (A5/B5) left unconnected — no host detection needed
//   - Shield/GND (A1/B1/S1) connected to GND
//
// Pin assignments (USB-C spec):
//   A1/B1 : GND
//   A6/B7 : D+
//   A7/B6 : D-
//   S1    : Shield (GND)
//   A4/B4 (VBUS), A5/B5 (CC), dummy pads: omitted from footprint
//
// The footprint has pads on both F.Cu and B.Cu — the builder
// solders the connector on whichever face matches their half.

module.exports = {
  params: {
    designator: 'USBC',
    GND: { type: 'net', value: 'GND' },
    dp:  { type: 'net', value: '' },  // D+  → connect to UART TX or RX GPIO
    dm:  { type: 'net', value: '' },  // D-  → connect to UART RX or TX GPIO
  },
  body: p => {
    return `
    (module HRO-TYPE-C-31-M-12-HandSoldering-NoSBU ${p.at} (layer F.Cu) (tedit 60481323)
      (attr smd)
      (fp_text reference "${p.ref}" (at 0 0.94378) (layer F.SilkS)
        (effects (font (size 0.8128 0.8128) (thickness 0.1524)))
      )
      (fp_text value "HRO-TYPE-C-31-M-12" (at 0 5.25) (layer Dwgs.User)
        (effects (font (size 0.8128 0.8128) (thickness 0.1524)))
      )

      (fp_line (start -4.47 4) (end 4.47 4) (layer Dwgs.User) (width 0.16))
      (fp_line (start -4.47 4) (end -4.47 -3.3) (layer Dwgs.User) (width 0.16))
      (fp_line (start 4.47 4) (end 4.47 -3.3) (layer Dwgs.User) (width 0.16))
      (fp_line (start -4.47 -3.3) (end 4.47 -3.3) (layer Dwgs.User) (width 0.16))

      (pad "" np_thru_hole circle (at -2.89 -2.25) (size 0.65 0.65) (drill 0.65) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at 2.89 -2.25) (size 0.65 0.65) (drill 0.65) (layers *.Cu *.Mask))

      (pad S1 thru_hole oval (at -4.32 1.4) (size 1 1.6) (drill oval 0.6 1.2) (layers *.Cu *.Mask) ${p.GND})
      (pad S1 thru_hole oval (at -4.32 -2.78) (size 1 2.1) (drill oval 0.6 1.7) (layers *.Cu *.Mask) ${p.GND})
      (pad S1 thru_hole oval (at 4.32 1.4) (size 1 1.6) (drill oval 0.6 1.2) (layers *.Cu *.Mask) ${p.GND})
      (pad S1 thru_hole oval (at 4.32 -2.78) (size 1 2.1) (drill oval 0.6 1.7) (layers *.Cu *.Mask) ${p.GND})

      (pad S1 smd roundrect (at -4.85 -2.78) (size 2.1 2.5) (layers F.Cu F.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at -4.85 -2.78) (size 2.1 2.5) (layers B.Cu B.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at 4.85 -2.78) (size 2.1 2.5) (layers F.Cu F.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at 4.85 -2.78) (size 2.1 2.5) (layers B.Cu B.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at -4.85 1.4) (size 2.1 2) (layers F.Cu F.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at -4.85 1.4) (size 2.1 2) (layers B.Cu B.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at 4.85 1.4) (size 2.1 2) (layers F.Cu F.Mask) (roundrect_rratio 0.25) ${p.GND})
      (pad S1 smd roundrect (at 4.85 1.4) (size 2.1 2) (layers B.Cu B.Mask) (roundrect_rratio 0.25) ${p.GND})

      (pad A1 smd rect (at -3.225 -4.195) (size 0.57 2.45) (layers F.Cu F.Paste F.Mask) ${p.GND})
      (pad B1 smd rect (at 3.225 -4.195) (size 0.57 2.45) (layers F.Cu F.Paste F.Mask) ${p.GND})
      (pad A1 smd rect (at 3.225 -4.195) (size 0.57 2.45) (layers B.Cu B.Paste B.Mask) ${p.GND})
      (pad B1 smd rect (at -3.225 -4.195) (size 0.57 2.45) (layers B.Cu B.Paste B.Mask) ${p.GND})



      (pad B7 smd rect (at -0.75 -4.195) (size 0.3 2.45) (layers F.Cu F.Paste F.Mask) ${p.dp})
      (pad A6 smd rect (at -0.25 -4.195) (size 0.3 2.45) (layers F.Cu F.Paste F.Mask) ${p.dp})
      (pad B7 smd rect (at 0.75 -4.195) (size 0.3 2.45) (layers B.Cu B.Paste B.Mask) ${p.dp})
      (pad A6 smd rect (at 0.25 -4.195) (size 0.3 2.45) (layers B.Cu B.Paste B.Mask) ${p.dp})

      (pad A7 smd rect (at 0.25 -4.195) (size 0.3 2.45) (layers F.Cu F.Paste F.Mask) ${p.dm})
      (pad B6 smd rect (at 0.75 -4.195) (size 0.3 2.45) (layers F.Cu F.Paste F.Mask) ${p.dm})
      (pad A7 smd rect (at -0.25 -4.195) (size 0.3 2.45) (layers B.Cu B.Paste B.Mask) ${p.dm})
      (pad B6 smd rect (at -0.75 -4.195) (size 0.3 2.45) (layers B.Cu B.Paste B.Mask) ${p.dm})


    )
    `
  }
}
