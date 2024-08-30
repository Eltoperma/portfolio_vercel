import sharp from 'sharp';
export default function resizeImage(file:ArrayBuffer, title:string){
    sharp(file)
    .resize(300, 300, {
        fit:'inside'
    })
    .toFile(title + '_small'+'.webp', (err, info) => {
        if(err){
            console.log(err)
        }
        console.log(info)
    })
}
