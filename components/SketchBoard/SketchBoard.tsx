"use client"
import { useAppSelector } from '@/GlobalStore/hooks';
import React from 'react'
import { selectActiveMenu } from '../Menu/MenuSlice';
import { RootState } from '@/GlobalStore/store';

const SketchBoard = () => {

    const activeMenu = useAppSelector(selectActiveMenu);
    const { color, size } = useAppSelector((state: RootState) => state.toolbox[activeMenu])

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const shouldDraw = React.useRef<boolean>(false);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;
        const setConfig = () => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
        }
        setConfig();
    }, [activeMenu, color, size]);

    React.useLayoutEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleMouseDown = (e: MouseEvent) => {
            shouldDraw.current = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!shouldDraw.current) return;
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }

        const handleMouseUp = () => {
            shouldDraw.current = false;
        }

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);

    return (
        <canvas ref={canvasRef}>Canvas is not supported here!</canvas>
    )
}

export default SketchBoard