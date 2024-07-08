
export default class Canvas {

    static getPixelRatio = function (context: CanvasRenderingContext2D | null): number {
        console.log('Determining pixel ratio.');

        if (!context) throw Error("No canvas!");

        let backingStores = [
            'webkitBackingStorePixelRatio',
            'mozBackingStorePixelRatio',
            'msBackingStorePixelRatio',
            'oBackingStorePixelRatio',
            'backingStorePixelRatio'
        ];

        let deviceRatio = window.devicePixelRatio;

        // Iterate through our backing store props and determine the proper backing ratio.
        let backingRatio = 1;
        for (let backingStore of backingStores) {
            if (context.hasOwnProperty(backingStore)) {
                backingRatio = Number(context[backingStore as keyof typeof context])
            }
        }

        // Return the proper pixel ratio by dividing the device ratio by the backing ratio
        return deviceRatio / backingRatio;
    }

    static generateCanvas = function (w: number, h: number) {
        console.log('Generating canvas.');

        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');

        // Pass our canvas' context to our getPixelRatio method
        var ratio = Canvas.getPixelRatio(context);

        if (!context) throw Error('No context');

        // Set the canvas' width then downscale via CSS
        canvas.width = Math.round(w * ratio);
        canvas.height = Math.round(h * ratio);
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

        // Scale the context so we get accurate pixel density
        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        return canvas;
    }

}
