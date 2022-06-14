import React, { useEffect, useRef } from "react"

export function BigText({children, ...props}) {
  var canvasRef = useRef(null)

  // console.log("BigText");
  // console.log(children);

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const style = window.getComputedStyle(canvas)
    context.font = style.font;
    console.log(context.font);

    var metrics = context.measureText(children);
    console.log(metrics);
    canvas.width = metrics.width // + 200;
    canvas.height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent // + 200;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = style.font;
    console.log(context.font);
    context.fillText(children, 0, metrics.actualBoundingBoxAscent);
    // context.fillText(children, 100, 100 + metrics.actualBoundingBoxAscent);

    //context.beginPath();
    //context.lineWidth = "4";
    //context.strokeStyle = "blue";
    //context.rect(100, 100, canvas.width-200, canvas.height-200);
    //context.stroke();

    //console.log("Hello!");
    //console.log(canvas.height);
    //console.log(canvas.width);

  }, [children])

  return <canvas ref={canvasRef} {...props} title={children}></canvas>

}