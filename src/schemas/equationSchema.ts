import Joi from '@hapi/joi';

function getNumberSchemaWithLabel(labelStr: string): Joi.NumberSchema {
  return Joi.number().label(labelStr).required();
}
const equationItemSchema = Joi.object({
  x: getNumberSchemaWithLabel('X-coefficient'),
  y: getNumberSchemaWithLabel('Y-coefficient'),
  z: getNumberSchemaWithLabel('Z-coefficient'),
  c: getNumberSchemaWithLabel('C-constant'),
});

export default Joi.object({ equations: Joi.array().label('Equations').required().items(equationItemSchema) }).required();
