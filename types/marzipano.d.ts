declare module 'marzipano' {
  export class Viewer {
    constructor(element: HTMLElement, opts?: any);
    createScene(data: any): any;
    lookTo(opts: any, transition?: any): void;
    view(): any;
    addEventListener(event: string, callback: () => void): void;
    destroy(): void;
  }
  export class ImageUrlSource {
    constructor(source: any, opts?: any);
    static fromString(url: string, opts?: any): any;
  }
  export class RectilinearView {
    constructor(params: any, lims: any);
    static limit: any;
  }
  export class EquirectGeometry {
    constructor(levels: any);
  }
}
