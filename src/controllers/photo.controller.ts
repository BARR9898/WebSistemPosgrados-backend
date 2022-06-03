import { request, Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Photo, { IPhoto } from '../models/Photo';





export async function createPhoto(req: Request, res: Response): Promise<Response> {
    try{
        const { title, description , master , tipo  } = req.body;
        const newPhoto = { title, description , master , tipo ,imagePath: req.file.path};
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.json({
            message: 'Photo Saved Successfully',
            photo
        });
    }
    catch(e){
        res.json('Error')
    }

};

export async function getPhoto(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const photo = await Photo.findById(id);
        return res.json(photo);
    } catch (error) {
        return res.json({error:error})
    }

}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {
   try {
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id) as IPhoto;
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });  
   } catch (error) {
       return res.json({ error:error})
   }

};

