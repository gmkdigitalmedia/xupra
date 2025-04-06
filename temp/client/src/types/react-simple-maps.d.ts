declare module 'react-simple-maps' {
  import React from 'react';
  
  export interface GeographyProps {
    geography: any;
    projection?: any;
    precision?: number;
    style?: React.CSSProperties;
    tabable?: boolean;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
  }
  
  export interface MarkerProps {
    coordinates: [number, number];
    className?: string;
    style?: React.CSSProperties;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onMouseDown?: (event: React.MouseEvent) => void;
    onMouseUp?: (event: React.MouseEvent) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
    children?: React.ReactNode;
  }
  
  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    className?: string;
    style?: React.CSSProperties;
    onMoveStart?: (event: React.MouseEvent) => void;
    onMoveEnd?: (position: any) => void;
    onMove?: (event: React.MouseEvent) => void;
    children?: React.ReactNode;
  }
  
  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: any;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  
  export interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: any[] }) => React.ReactNode;
  }
  
  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function Marker(props: MarkerProps): JSX.Element;
  export function ZoomableGroup(props: ZoomableGroupProps): JSX.Element;
}