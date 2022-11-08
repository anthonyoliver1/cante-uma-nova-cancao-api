const { Router } = require('express');
const Music = require('./models/music');
const Joi = require('joi');

const withAsyncErrorHandler = require('../middleware/async-error');
const validate = require('../middleware/validate');

const router = Router();

const CreateMusicSchema = {
    body: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        album: Joi.string().allow(null, ''),
        icon: Joi.string().allow(null, ''),
        color: Joi.string().allow(null, ''),
        music: {
            text: Joi.string(),
            video: Joi.string().allow(null, ''),
            audio: Joi.string().allow(null, '')
        },
        number: Joi.number()
    }),
}

const UpdateMusicSchema = {
    body: Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        album: Joi.string().allow(null, ''),
        icon: Joi.string().allow(null, ''),
        color: Joi.string().allow(null, ''),
        music: {
            text: Joi.string(),
            video: Joi.string().allow(null, ''),
            audio: Joi.string().allow(null, '')
        },
        number: Joi.number().required()
    }),
}

const FindMusicSchema = {
    body: Joi.object({
        number: Joi.number().required()
    }),
}

const DeleteMusicSchema = {
    body: Joi.object({
        number: Joi.number().required()
    }),
}

const getAllMusics = async (_req, resp) => {
    const music = await Music.find();
    resp.status(200).json(music);
}

const findMusic = async (req, resp) => {
    const musicNumberForFinding = req.body;
    const music = await Music.findOne(musicNumberForFinding);

    if (!music) {
        return resp.status(404).json({ message: 'Música não encontrada!', error: 'MUSIC_NOT_FOUND' });
    }

    resp.status(200).json(music);
}

const createMusic = async (req, resp) => {
    const musicDataForCreating = req.body;
    const onlyNumerMusic = req.body.number;

    const music = await Music.findOne({ number: onlyNumerMusic });

    if (music) {
        return resp.status(409).json({ message: 'Música já criada!', error: 'MUSIC_CREATED' });
    }

    const creatingMusic = await Music.create(musicDataForCreating);
    resp.status(200).json(creatingMusic);
}

const updateMusic = async (req, resp) => {
    const musicDataForUpdating = req.body;
    const onlyNumerMusic = req.body.number;

    const music = await Music.findOne({ number: onlyNumerMusic });

    if (!music) {
        return resp.status(404).json({ message: 'Não foi possível atualizar a música!', error: 'MUSIC_NOT_FOUND_FOR_UPDATING' });
    }

    const musicUpdated = await Music.updateOne({ "_id": music.id }, musicDataForUpdating);
    resp.status(200).json(musicUpdated);
}

const deleteMusic = async (req, resp) => {
    const musicDataForDeleting = req.body;
    const music = await Music.findOne(musicDataForDeleting);

    if (!music) {
        return resp.status(404).json({ message: 'Música já excluída!', error: 'MUSIC_DELETED' });
    }

    const musicDeleted = await Music.deleteOne(music._id);
    resp.status(200).json(musicDeleted);
}



router.get('/get-all-musics', withAsyncErrorHandler(getAllMusics));
router.get('/find-music', validate(FindMusicSchema), withAsyncErrorHandler(findMusic));
router.post('/create-music', validate(CreateMusicSchema), withAsyncErrorHandler(createMusic));
router.patch('/update-music', validate(UpdateMusicSchema), withAsyncErrorHandler(updateMusic));
router.delete('/delete-music', validate(DeleteMusicSchema), withAsyncErrorHandler(deleteMusic));

module.exports = router;
