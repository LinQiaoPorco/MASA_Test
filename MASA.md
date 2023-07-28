```
using ME_Hub_Models;
using Microsoft.AspNetCore.Components;


namespace ME_Working_Hub.Pages.EChartsComponents;
public partial class VisualCalendar : ComponentBase
{
    [Parameter]
    public VIRAResponse? VIRACollection { get; set; }
    public object? CalendarOptions;
    public string[] Colors = new string[] { "#A85F02", "#001A72", "#3D5881", "#8F9EB5", "#CCD3DB", "#BF834B", "#D9B48B", "#EFDDC4", "#A13432", "#2D3A2A", "#68875C" };

    protected override async Task OnInitializedAsync()
    {
        _ = await Task.Run(() =>
        CalendarOptions = new
        {
            ColorBy = "series",
            Title = new
            {
                Left = "center",
                Text = "VIRA Calendar",
                Top = "10"
            },
            Tooltip = new
            {
                Tigger = "item",
                Formatter = "{c0}"
            },
            Legend = new
            {
                Right = "10",
                Top = "middle",
                Orient = "vertical"
            },
            VisualMap = new[]
            {
                new{
                    Min= 0,
                    Max= 1000,
                    InRange=new {
                        Color=Colors,
                        Opacity=new []{0, 0.3}
                    },
                    SeriesIndex=new []{2},
                    Orient= "horizontal",
                    Left= "10%",
                    Bottom= 20,
                    Show = false
                }
            },
            Calendar = new[]
            {
                new{
                    Top = 80,
                    Left = 30,
                    Right = 30,
                    Range = new []{DateTime.Now.AddMonths(-2).ToString("yyyy-MM"), DateTime.Now.AddMonths(18).ToString("yyyy-MM")},
                    Z = 2,
                    Orient = "vertical",
                    DayLabel = new {
                        FirstDay = 1
                    },
                    MonthLabel = new {
                        Show = false
                    },
                    YearLabel = new {
                        Show = true,
                        Margin = 25
                    },
                    SplitLine=new {
                        Show = true,
                        LineStyle = new
                        {
                            Type = "dashed"
                        },
                    },
                    ItemStyle = new
                    {
                        Color = "#f5f5f5",
                        BorderColor = "#FFF",
                        BorderWidth = 1
                    }
                }
            },
            

            // Custome Series or standard Series
            Series = new[]
            {
                new
                {
                    Type = "custom",
                    CoordinateSystem = "calendar",
                    Dimensions = new[]{null, new{Type = "ordinal"}},
                    RenderItem = "function (params, api) {const cellPoint = api.coord(api.value(0));const cellWidth = params.coordSys.cellWidth;const cellHeight = params.coordSys.cellHeight;const value = api.value(1);const events = value && value.split('|');if (isNaN(cellPoint[0]) || isNaN(cellPoint[1])) {return;}const group = {type: 'group',children:[{type: 'circle',shape: {cx: 0,cy: -8,r:20},position: [cellPoint[0],cellPoint[1]+10,],style: api.style({fill: '#c4332b'}),z2:1}]};group.children.push({type: 'text',style: {x: events[0].length == 3 ? cellPoint[0] - cellWidth / 3.8 : events[0].length == 2 ? cellPoint[0] - cellWidth / 6 : cellPoint[0] - cellWidth / 11,y: cellPoint[1]-cellWidth/12,text: events[0],fill: '#FFF',textFont: api.font({ fontSize: 20 })},z2:2});if (events[1] != '0'){group.children.push({type: 'text',style: {x: cellPoint[0]+40,y: cellPoint[1]-5,text: events[1],fill: '#000',textFont: api.font({ fontSize: 20 })}});}if (events[2] != '0'){group.children.push({type: 'rect',shape: {width: cellWidth,height: cellHeight},position:[cellPoint[0]-cellWidth/2,cellPoint[1]-cellHeight/2],style: {style: api.style({fill: '#222'})},z2:0});}return group;}",
                    Data = new[]{
                        new[]{"2023-08-01", "164|0|0" },
                        new[]{"2023-08-02", "14|0|0" },
                        new[]{"2023-08-03", "64|0|0" },
                        new[]{"2023-08-04", "6|0|0" },
                        new[]{"2023-08-05", "4|0|1" },
                        new[]{"2023-08-06", "4|W22|1" }
                    }
            }},
            Emphasis = new[]
            {
                new{
                    Focus = "series",
                    BlurScope = "coordinateSystem"
                }
            },
            Color = Colors
        }
        );
    }
}

```