import { config } from 'https://deno.land/x/dotenv/mod.ts';

const { JSON_FILE_LOCATION, BASE_NAME_GROUP, JSON_FILE_OUTPUT } = config();

let groupCounter = 1;
const jsonData = JSON.parse(Deno.readTextFileSync(JSON_FILE_LOCATION));
const groups = jsonData.nodes.reduce((groupedColors, { color }) => {
  if (!groupedColors[color]) {
    groupedColors[color] = {
      name: `${BASE_NAME_GROUP} ${groupCounter++}`,
      counter: 0,
    };
  }
  groupedColors[color].counter++;

  return groupedColors;
}, {});

Deno.writeTextFileSync(JSON_FILE_OUTPUT, JSON.stringify(groups));
