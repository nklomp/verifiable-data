import { getNodeProcessFragment } from './getNodeProcessFragment';
import insertBeforeClosingTag from './insertBeforeClosingTag';
import { tn } from './constants';

import { addNodeShape } from './addNodeShape';

const addTask = (definition: any, options: any, g: any) => {
  let modifiedDefinition = `${definition}`;

  let x = options.number * 200;

  const c = {
    x: x,
    y: tn.y,
    w: 100,
    h: 100,
    ...options,
  };

  const processNodeFragment = getNodeProcessFragment(c, g);

  modifiedDefinition = insertBeforeClosingTag(
    modifiedDefinition,
    processNodeFragment,
    '</bpmn:process>'
  );

  modifiedDefinition = addNodeShape(modifiedDefinition, c);

  return { definition: modifiedDefinition, node: c };
};

export default addTask;
