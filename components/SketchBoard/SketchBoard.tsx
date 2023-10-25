"use client"
import React from 'react'

const SketchBoard = () => {

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    React.useEffect(() => {
        if(!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if(!ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    return (
        <canvas ref={canvasRef}>Canvas is not supported here!</canvas>
    )
}

export default SketchBoard