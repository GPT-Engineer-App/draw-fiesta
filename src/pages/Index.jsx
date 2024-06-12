import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';

const colors = ['#000000', '#FF0000', '#FFFF00', '#0000FF', '#FFFFFF'];
const brushSizes = [4, 8, 12, 16, 20];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[brushSizes.length - 1]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" height="100vh" width="100vw">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: 'block' }}
      />
      <Flex position="absolute" bottom={4} left="50%" transform="translateX(-50%)" bg="rgba(255, 255, 255, 0.8)" p={2} borderRadius="md">
        <VStack spacing={2} mr={4}>
          {colors.map((c) => (
            <IconButton
              key={c}
              aria-label={`Select ${c}`}
              icon={<FaCircle color={c} />}
              isRound
              size="lg"
              onClick={() => setColor(c)}
              border={color === c ? '2px solid black' : 'none'}
            />
          ))}
        </VStack>
        <VStack spacing={2}>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`Select brush size ${size}`}
              icon={<FaCircle size={`${size}px`} />}
              isRound
              size="lg"
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? '2px solid black' : 'none'}
            />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;