import Joi from '@hapi/joi';

// eslint-disable-next-line no-useless-escape
const regex = /^[\d\w\s,]+$/;
export default Joi.object({ seq: Joi.string().label('Sequence').regex(regex).required() }).required();
