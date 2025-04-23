import React, {useState, useRef, useEffect} from 'react';
import './compassWidget.css';

import {getResizeCursor} from './utils/getResizeCursor';
import {Lines} from './components/Lines';
import {ResizeMode} from './models';
import {ResizeHandle} from './components/ResizeHandle';
import {ButtonZoom} from './components/ButtonZoom';

interface WindDirectionWidgetProps {
  windSpeed?: number;
  windDirection?: number;
  title?: string;
  defaultPosition?: {x: number; y: number};
  defaultSize?: {width: number; height: number};
  minWidth?: number;
  minHeight?: number;
}

const WindDirectionWidget: React.FC<WindDirectionWidgetProps> = ({
  windSpeed = 180,
  windDirection = 0,
  title = 'Направление порывов ветра',
  defaultPosition = {x: 100, y: 100},
  defaultSize = {width: 270, height: 270},
  minWidth = 270,
  minHeight = 270,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [currentDirection, setCurrentDirection] = useState(windDirection);
  const [currentSpeed, setCurrentSpeed] = useState(windSpeed);
  const [resizeMode, setResizeMode] = useState<ResizeMode>(null);
  const [startPos, setStartPos] = useState({x: 0, y: 0});
  const [startSize, setStartSize] = useState({width: 0, height: 0});
  const widgetRef = useRef<HTMLDivElement>(null);
  const [maximized, setMaximized] = useState(false);

  const onOpenWindow = () => {
    if (maximized) {
      setSize(defaultSize);
      setPosition(defaultPosition);
    } else {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setPosition({
        x: 0,
        y: 0,
      });
    }
    setMaximized(!maximized);
  };

  function getRotationDegree(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomDegree = Math.floor(getRotationDegree(0, 360));
      setCurrentDirection(randomDegree);

      setCurrentSpeed(prev => {
        const change = Math.floor(Math.random() * 30) - 15;
        return Math.max(0, prev + change);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDragStart = (e: React.MouseEvent) => {
    if (resizeMode) return;

    const widgetRect = widgetRef.current?.getBoundingClientRect();
    if (!widgetRect) return;
    console.log(widgetRect);
    setStartPos({
      x: e.pageX - widgetRect.left,
      y: e.pageY - widgetRect.top,
    });

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    e.preventDefault();
  };

  const handleDrag = (e: MouseEvent) => {
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    const maxX = window.innerWidth - size.width;
    const maxY = window.innerHeight - size.height;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleResizeStart = (e: React.MouseEvent, mode: ResizeMode) => {
    setResizeMode(mode);
    setStartPos({x: e.clientX, y: e.clientY});
    setStartSize(size);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleResize = (e: MouseEvent) => {
    if (!resizeMode) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    let newWidth = startSize.width;
    let newHeight = startSize.height;
    let newX = position.x;
    let newY = position.y;

    const aspectRatio = startSize.width / startSize.height;

    if (resizeMode.includes('e') || resizeMode.includes('w')) {
      newWidth = Math.max(
        minWidth,
        startSize.width + (resizeMode.includes('e') ? deltaX : -deltaX),
      );
      newHeight = newWidth / aspectRatio;

      if (resizeMode.includes('w')) {
        newX = position.x + (startSize.width - newWidth);
      }
      if (resizeMode.includes('n') || resizeMode.includes('s')) {
        newY = position.y + (startSize.height - newHeight);
      }
    } else if (resizeMode.includes('n') || resizeMode.includes('s')) {
      newHeight = Math.max(
        minHeight,
        startSize.height + (resizeMode.includes('s') ? deltaY : -deltaY),
      );
      newWidth = newHeight * aspectRatio;

      if (resizeMode.includes('n')) {
        newY = position.y + (startSize.height - newHeight);
      }
      if (resizeMode.includes('w')) {
        newX = position.x + (startSize.width - newWidth);
      }
    }

    if (resizeMode.length === 2) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        newWidth = Math.max(
          minWidth,
          startSize.width + (resizeMode.includes('e') ? deltaX : -deltaX),
        );
        newHeight = newWidth / aspectRatio;
      } else {
        newHeight = Math.max(
          minHeight,
          startSize.height + (resizeMode.includes('s') ? deltaY : -deltaY),
        );
        newWidth = newHeight * aspectRatio;
      }

      if (resizeMode.includes('n')) {
        newY = position.y + (startSize.height - newHeight);
      }
      if (resizeMode.includes('w')) {
        newX = position.x + (startSize.width - newWidth);
      }
    }

    setSize({width: newWidth, height: newHeight});
    setPosition({x: newX, y: newY});
  };

  const handleResizeEnd = () => {
    setResizeMode(null);
  };

  useEffect(() => {
    if (resizeMode) {
      document.addEventListener('mousemove', handleResize);
      document.addEventListener('mouseup', handleResizeEnd);
      return () => {
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizeMode, startPos, startSize]);

  return (
    <div
      ref={widgetRef}
      className='wind-widget'
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: resizeMode ? getResizeCursor(resizeMode) : 'move',
      }}
      onMouseDown={maximized ? undefined : handleDragStart}>
      <ButtonZoom title={title} onOpenWindow={onOpenWindow} />
      <div className='compass'>
        <div className={maximized ? 'compass-rose-zoom' : 'compass-rose'}>
          <Lines currentDirection={currentDirection} />
          <div className='direction-n'>Север</div>
          <div className='direction-e'>Восток</div>
          <div className='direction-s'>Юг</div>
          <div className='direction-w'>Запад</div>
          <div className='wind-speed'>{currentSpeed}</div>
        </div>
      </div>
      {!maximized && <ResizeHandle handleResizeStart={handleResizeStart} />}
    </div>
  );
};

export default WindDirectionWidget;
