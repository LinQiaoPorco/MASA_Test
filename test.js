function render(params, api)
{
    const cellPoint = api.coord(api.value(0));
    const cellWidth = params.coordSys.cellWidth;
    const cellHeight = params.coordSys.cellHeight;
    const value = api.value(1);
    const events = value && value.split('|');
    if (isNaN(cellPoint[0]) || isNaN(cellPoint[1]))
    { return; }
    const group = {
        type: 'group',
        children:  [{
                    type: 'circle',
                    shape: { cx: 0, cy: 0, r: 5 },
                    position: [cellPoint[0], cellPoint[1] + 10,],
                    style: api.style({ fill: '#c4332b'}),
                    z2: 1
                }]
    };
    group.children.push({
        type: 'text',
        style: {
            x: events[0].length == 3 ? cellPoint[0] - cellWidth / 4
                : events[0].length == 2 ? cellPoint[0] - cellWidth / 6
                    : cellPoint[0] - cellWidth / 11,
            y: cellPoint[1] - cellWidth / 12,
            text: events[0],
            fill: '#FFF',
            textFont: api.font({ fontSize: 20 })
        },
        z2: 2
    });
    if (events[1] != '0') {
        group.children.push({
            type: 'text',
            style: {
                x: cellPoint[0] + 40,
                y: cellPoint[1] - 5,
                text: events[1], fill: '#000',
                textFont: api.font({ fontSize: 20 })
            }
        })
    };
    if (events[2] != '0') {
        group.children.push({
            type: 'rect',
            shape: {
                width: cellWidth,
                height: cellHeight
            },
            position: [cellPoint[0] - cellWidth / 2, cellPoint[1] - cellHeight / 2],
            style: { style: api.style({ fill: '#222' }) },
            z2: 0
        })
    };
    return group;
}

