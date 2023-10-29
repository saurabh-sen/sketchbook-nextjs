"use client"
import { useAppDispatch, useAppSelector } from '@/GlobalStore/hooks';
import React from 'react'
import { handleActionMenuClick, selectActionMenu, selectActiveMenu } from '../Menu/MenuSlice';
import { RootState } from '@/GlobalStore/store';

const SketchBoard = () => {

    const activeMenu = useAppSelector(selectActiveMenu);
    const actionMenu = useAppSelector(selectActionMenu);

    const dispatch = useAppDispatch();
    const { color, size } = useAppSelector((state: RootState) => state.toolbox[activeMenu])

    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const shouldDraw = React.useRef<boolean>(false);
    const drawingHistory = React.useRef<ImageData[]>([]);
    const currentHistoryIndex = React.useRef<number>(0);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!actionMenu) return;
        switch (actionMenu) {
            case "DOWNLOAD":
                const link = document.createElement('a');
                const fileName = prompt('Enter file name', 'canvas');
                if (!fileName) break;
                link.download = `${fileName}.jpg`;
                link.href = canvas.toDataURL();
                link.click();
                break;
            case "UNDO":
                currentHistoryIndex.current--;
                if (currentHistoryIndex.current < 0){
                    currentHistoryIndex.current = 0;
                    break;
                };
                const img = drawingHistory.current[currentHistoryIndex.current];
                ctx.putImageData(img, 0, 0);
                break;
            case 'REDO':
                currentHistoryIndex.current++;
                if (currentHistoryIndex.current >= drawingHistory.current.length){
                    currentHistoryIndex.current = drawingHistory.current.length-1;
                    break;
                };
                const img2 = drawingHistory.current[currentHistoryIndex.current];
                ctx.putImageData(img2, 0, 0);
                break;
            default:
                // clear all canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawingHistory.current = [];
                currentHistoryIndex.current = 0;
                break;
        }
        dispatch(handleActionMenuClick(null));
    }, [actionMenu, dispatch]);

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

        const beginDrawing = (x: number, y: number) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        const lineDrawing = (x: number, y: number) => {
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        const handleMouseDown = (e: MouseEvent) => {
            shouldDraw.current = true;
            beginDrawing(e.clientX, e.clientY);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!shouldDraw.current) return;
            lineDrawing(e.clientX, e.clientY);
        }

        const handleMouseUp = () => {
            shouldDraw.current = false;
            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawingHistory.current.push(img);

            // if drawingHistory stack is goes above 20 images then delete old ones and only store maximum 20.
            if (drawingHistory.current.length > 20) {
                drawingHistory.current = drawingHistory.current.slice(-20);
            }
            currentHistoryIndex.current = drawingHistory.current.length-1;
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