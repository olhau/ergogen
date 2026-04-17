module.exports = {
  params: {
    designator: 'USB',
    side: 'F',
    include_traces: true,
    
    // Default net definitions
    GND: { type: 'net', value: 'GND' },
    D_PLUS: { type: 'net', value: 'D+' },
    D_MINUS: { type: 'net', value: 'D-' },
  },
  body: p => {
    // Helper function to draw absolute-positioned PCB traces outside the footprint.
    // p.eaxy() ensures traces rotate and translate perfectly with the footprint!
    const seg = (x1, y1, x2, y2, layer, width = 0.25) => {
      return `  (segment (start ${p.eaxy(x1, y1)}) (end ${p.eaxy(x2, y2)}) (width ${width}) (layer "${layer}"))\n`;
    }

    let traces = '';
    if (p.include_traces) {
      // Front D+
      traces += seg(-0.75, -2.225, -0.25, -2.225, 'F.Cu'); 
      traces += seg(-0.5, -2.225, -0.5, -4.0, 'F.Cu');     
      traces += seg(-0.5, -4.0, 0, -4.0, 'F.Cu');          
      // Back D+
      traces += seg(0.25, -2.225, 0.75, -2.225, 'B.Cu');   
      traces += seg(0.5, -2.225, 0.5, -4.0, 'B.Cu');
      traces += seg(0.5, -4.0, 0, -4.0, 'B.Cu');

      // Front D-
      traces += seg(0.25, -2.225, 0.75, -2.225, 'F.Cu');   
      traces += seg(0.5, -2.225, 0.5, -5.5, 'F.Cu');       
      traces += seg(0.5, -5.5, 0, -5.5, 'F.Cu');           
      // Back D-
      traces += seg(-0.75, -2.225, -0.25, -2.225, 'B.Cu'); 
      traces += seg(-0.5, -2.225, -0.5, -5.5, 'B.Cu');
      traces += seg(-0.5, -5.5, 0, -5.5, 'B.Cu');

      // Front GND Left
      traces += seg(-3.35, -2.225, -3.05, -2.225, 'F.Cu', 0.4);
      traces += seg(-3.2, -2.225, -3.2, -7.0, 'F.Cu', 0.4);
      traces += seg(-3.2, -7.0, 0, -7.0, 'F.Cu', 0.4);
      // Front GND Right
      traces += seg(3.05, -2.225, 3.35, -2.225, 'F.Cu', 0.4);
      traces += seg(3.2, -2.225, 3.2, -7.0, 'F.Cu', 0.4);
      traces += seg(3.2, -7.0, 0, -7.0, 'F.Cu', 0.4);
      // Back GND Left
      traces += seg(-3.35, -2.225, -3.05, -2.225, 'B.Cu', 0.4);
      traces += seg(-3.2, -2.225, -3.2, -7.0, 'B.Cu', 0.4);
      traces += seg(-3.2, -7.0, 0, -7.0, 'B.Cu', 0.4);
      // Back GND Right
      traces += seg(3.05, -2.225, 3.35, -2.225, 'B.Cu', 0.4);
      traces += seg(3.2, -2.225, 3.2, -7.0, 'B.Cu', 0.4);
      traces += seg(3.2, -7.0, 0, -7.0, 'B.Cu', 0.4);
    }

    return `
    (footprint "USB-C-SHOU_TYPE-C-16P-REVERSIBLE-ROUTED" (layer "${p.side}.Cu")
      ${p.at}
      (attr smd)
      (fp_text reference "${p.ref}" (at 0 6.5 ${p.r}) (layer "${p.side}.SilkS") ${p.ref_hide}
        (effects (font (size 1 1) (thickness 0.15)))
      )
      
      (fp_line (start -4.45 -1.82) (end  4.55 -1.82) (layer "Dwgs.User") (width 0.25))
      (fp_line (start  4.55 -1.82) (end  4.55  4.78) (layer "Dwgs.User") (width 0.25))
      (fp_line (start -4.45 -1.82) (end -4.45  4.78) (layer "Dwgs.User") (width 0.25))

      (fp_line (start -4.47 -1.83) (end  4.47 -1.83) (layer "F.SilkS") (width 0.25))
      (fp_line (start  4.47 -1.83) (end  4.47  4.67) (layer "F.SilkS") (width 0.25))
      (fp_line (start  4.47  4.67) (end -4.47  4.67) (layer "F.SilkS") (width 0.25))
      (fp_line (start -4.47  4.67) (end -4.47 -1.83) (layer "F.SilkS") (width 0.25))
      
      (fp_line (start -4.47 -1.83) (end  4.47 -1.83) (layer "B.SilkS") (width 0.25))
      (fp_line (start  4.47 -1.83) (end  4.47  4.67) (layer "B.SilkS") (width 0.25))
      (fp_line (start  4.47  4.67) (end -4.47  4.67) (layer "B.SilkS") (width 0.25))
      (fp_line (start -4.47  4.67) (end -4.47 -1.83) (layer "B.SilkS") (width 0.25))

      (fp_text user "D+"  (at  1.5 -4.0 ${p.r}) (layer "F.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15))))
      (fp_text user "D-"  (at  1.5 -5.5 ${p.r}) (layer "F.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15))))
      (fp_text user "GND" (at  1.5 -7.0 ${p.r}) (layer "F.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15))))

      (fp_text user "D+"  (at -1.5 -4.0 ${p.r}) (layer "B.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
      (fp_text user "D-"  (at -1.5 -5.5 ${p.r}) (layer "B.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
      (fp_text user "GND" (at -1.5 -7.0 ${p.r}) (layer "B.SilkS") (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))

      (fp_line (start -4.47 -8.0) (end  4.47 -8.0) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47 -8.0) (end  4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "F.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -8.0) (layer "F.CrtYd") (width 0.05))

      (fp_line (start -4.47 -8.0) (end  4.47 -8.0) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47 -8.0) (end  4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start  4.47  4.68) (end -4.47  4.68) (layer "B.CrtYd") (width 0.05))
      (fp_line (start -4.47  4.68) (end -4.47 -8.0) (layer "B.CrtYd") (width 0.05))

      (pad "A1"  smd rect (at -3.35 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
      (pad "B12" smd rect (at -3.05 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
      (pad "B1"  smd rect (at  3.05 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
      (pad "A12" smd rect (at  3.35 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.GND.str})
      (pad "B7"  smd rect (at -0.75 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.D_PLUS.str})
      (pad "A6"  smd rect (at -0.25 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.D_PLUS.str})
      (pad "A7"  smd rect (at  0.25 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.D_MINUS.str})
      (pad "B6"  smd rect (at  0.75 -2.225) (size 0.3 1.8) (layers "F.Cu" "F.Paste" "F.Mask") ${p.D_MINUS.str})

      (pad "B1"  smd rect (at -3.05 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
      (pad "A12" smd rect (at -3.35 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
      (pad "A1"  smd rect (at  3.35 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
      (pad "B12" smd rect (at  3.05 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.GND.str})
      (pad "A6"  smd rect (at  0.25 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.D_PLUS.str})
      (pad "B7"  smd rect (at  0.75 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.D_PLUS.str})
      (pad "A7"  smd rect (at -0.25 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.D_MINUS.str})
      (pad "B6"  smd rect (at -0.75 -2.225) (size 0.3 1.8) (layers "B.Cu" "B.Paste" "B.Mask") ${p.D_MINUS.str})

      (pad "S1" thru_hole oval (at  5.62  2.58) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") ${p.GND.str})
      (pad "S1" thru_hole oval (at  5.62 -1.42) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") ${p.GND.str})
      (pad "S1" thru_hole oval (at -5.62  2.58) (size 1.0 2.1) (drill oval 0.6 1.5) (layers "*.Cu" "*.Mask") ${p.GND.str})
      (pad "S1" thru_hole oval (at -5.62 -1.42) (size 1.0 1.7) (drill oval 0.6 1.1) (layers "*.Cu" "*.Mask") ${p.GND.str})

      (pad "D+"  thru_hole circle (at 0 -4.0) (size 0.8 0.8) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.D_PLUS.str})
      (pad "D-"  thru_hole circle (at 0 -5.5) (size 0.8 0.8) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.D_MINUS.str})
      (pad "GND" thru_hole circle (at 0 -7.0) (size 0.8 0.8) (drill 0.4) (layers "*.Cu" "*.Mask") ${p.GND.str})
    )
${traces}
    `;
  }
};
