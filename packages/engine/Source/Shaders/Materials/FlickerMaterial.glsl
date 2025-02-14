uniform vec4 color;
uniform float speed;

czm_material czm_getMaterial(czm_materialInput materialInput) {
    czm_material material = czm_getDefaultMaterial(materialInput);
    float time = fract(czm_frameNumber * speed * 10.0 / 1000.0);
    vec2 st = materialInput.st;
    float r = smoothstep(0.0, 1.0, time);
    material.diffuse = color.rgb;
    material.alpha = color.a * r;
    return material;
}
