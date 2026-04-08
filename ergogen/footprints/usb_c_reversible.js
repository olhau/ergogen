module.exports = {
  params: {
    designator: 'USB',
    side: 'F',
    reversible: true,
    gnd: { type: 'net', value: 'GND' },
    D_minus: { type: 'net', value: 'D_minus' },
    D_plus: { type: 'net', value: 'D_plus' }
  },

  body: p => {
    const back = p.side === 'B'
    const want_front = !back || p.reversible
    const want_back  = back  || p.reversible

    const silk  = back ? 'B.SilkS' : 'F.SilkS'
    const fab   = back ? 'B.Fab'   : 'F.Fab'
    const crtyd = back ? 'B.CrtYd' : 'F.CrtYd'

    const fp_layer = want_front ? 'F.Cu' : 'B.Cu'

    const paste_mask = '(solder_paste_margin -0.05) (solder_mask_margin 0.03)'

    const Y = -4.045

    const pad = (name, layer, x, y, w, h, net) =>
      `(pad "${name}" smd roundrect
        (at ${x} ${y})
        (size ${w} ${h})
        (layers "${layer}.Cu" "${layer}.Mask" "${layer}.Paste")
        (roundrect_rratio 0.25)
        ${paste_mask}
        ${net})`

    const f = (n,x)=> pad(n,'F',x,Y,0.35,2.0,n==='GND'?p.gnd.str:(n==='D_minus'?p.D_minus.str:p.D_plus.str))
    const b = (n,x)=> pad(n,'B',x,Y,0.35,2.0,n==='GND'?p.gnd.str:(n==='D_minus'?p.D_minus.str:p.D_plus.str))

    const f_pads = want_front ? `
      ${f('GND', -3.25)}
      ${f('GND',  3.25)}
      ${f('D_minus', -0.25)}
      ${f('D_minus',  0.75)}
      ${f('D_plus',   0.25)}
      ${f('D_plus',  -0.75)}
    ` : ''

    const b_pads = want_back ? `
      ${b('GND',  3.25)}
      ${b('GND', -3.25)}
      ${b('D_minus',  0.25)}
      ${b('D_minus', -0.75)}
      ${b('D_plus',  -0.25)}
      ${b('D_plus',   0.75)}
    ` : ''

    const sh = `
      (pad "SH" thru_hole oval (at -4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7) (layers *.Cu *.Mask) ${p.gnd.str})
      (pad "SH" thru_hole oval (at  4.32 -3.13) (size 1 2.1) (drill oval 0.6 1.7) (layers *.Cu *.Mask) ${p.gnd.str})
      (pad "SH" thru_hole oval (at -4.32  1.05) (size 1 1.6) (drill oval 0.6 1.2) (layers *.Cu *.Mask) ${p.gnd.str})
      (pad "SH" thru_hole oval (at  4.32  1.05) (size 1 1.6) (drill oval 0.6 1.2) (layers *.Cu *.Mask) ${p.gnd.str})
    `

    const npth = `
      (pad "" np_thru_hole circle (at -2.89 -2.6) (size 0.65 0.65) (drill 0.65) (layers *.Cu *.Mask))
      (pad "" np_thru_hole circle (at  2.89 -2.6) (size 0.65 0.65) (drill 0.65) (layers *.Cu *.Mask))
    `

    const keepout = `
      (zone (net 0) (layers F.Cu B.Cu)
        (keepout (tracks yes) (vias yes) (pads no) (copperpour yes))
        (polygon (pts (xy -5 -1) (xy 5 -1) (xy 5 -6) (xy -5 -6)))
      )
    `

    return `
    (footprint "USB_C_Reversible_Optimized"
      (layer "${fp_layer}")
      ${p.at}

      (property "Reference" "${p.ref}" (at 0 -5.5) (layer "${silk}"))
      (property "Value" "USB_C" (at 0 5.5) (layer "${fab}"))

      ${f_pads}
      ${b_pads}
      ${sh}
      ${npth}
      ${keepout}
    )`
  }
};
