import { request, Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import MyFile , {IPhoto} from '../models/File';

export async function getFiles(req: Request, res: Response): Promise<Response> {
    try {
        const files = await MyFile.find();
        return res.json(files);
    } catch (error) {
        return res.json({ error: error})
    }

};



export async function createFile(req: Request, res: Response): Promise<Response> {
    try{
        const { title, description , master, tipo } = req.body;
        const newFile = { title, description, master, tipo ,imagePath: req.file.path};
        const file = new MyFile(newFile);
        await file.save();
        return res.json({
            message: 'Photo Saved Successfully',
            file
        });
    }
    catch(e){
        res.json('Error')
    }

};

export async function getFile(req: Request, res: Response): Promise<Response> {
    
    try {
        const { id } = req.params;
        const file = await MyFile.findById(id);
        return res.json(file);  
    } catch (error) {
        return res.json({error:error})
    }
    

}

export async function deleteFile(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const file = await MyFile.findByIdAndRemove(id) as IPhoto;
        if (file) {
            await fs.unlink(path.resolve(file.imagePath));
        }
        return res.json({ message: 'File Deleted' });
    } catch (error) {
        return res.json({ error: error})
    }

};
