declare module 'jsvectormap' {
    type JsVectorMapOptions = Record<string, unknown>;
    type JsVectorMapInstance = {
        destroy?: () => void;
    };

    const jsVectorMap: new (options: JsVectorMapOptions) => JsVectorMapInstance;
    export default jsVectorMap;
}
