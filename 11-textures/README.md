# 11 - Textures

## Key Learning Points 
- Textures (especially metalness and the roughness) follow the PBR principles
- Physically Based Rendering(PBR)
- new THREE textureLoader.load()
- UV wrapping is like unwrapping an origami or candy wrap to create a 2D plane (flat surface)
- `geometry.attributes.uv` verticies in a Float32 array of the material texture which wraps 3D object 
- Vector2 is 2D x and y axes 
- Vector3 is 3D x, y and z axes 
- filtering and mipmapping

### Textures 
- 3 crucial elements to textures 
- the weight 
- the size (or resolution)
- the data 

### Weight 
- refers to file type 
- .jpg lossy compression but usually lighter 
- .png lossless compression but usually heavier 
- can use compression sites like TinyPNG - makes file smaller 
- smaller files are for GPU 

### Data 
- textures support transparency but we can't have transparency in .jpg 
- better to use .png file 

## Resources 
[Theory of PBR](https://marmoset.co/posts/basic-theory-of-physically-based-rendering/)
[poliigon](poliigon.com)
[3dtextures](3dtextures.me)
[arroway](arroway-textures.ch)
