type Cell = {
  address: string;
  value: string;
};

type HandledCell = {
  address: [number, number];
  value: string;
  size?: {
    width: number;
    height: number;
  };
};

type RenderMatrixSize = [width: number, height: number];

const SINGLE_CELL_ADDRESS_REG_EXP = /^(\w)(\d)$/;
const RANGE_CELL_ADDRESS_REG_EXP = /^^(\w)(\d):(\w)(\d)$$/;
const A_LETTER_CHAR_CODE = 65;

const table: Cell[] = [
  {
    address: 'A1',
    value: 'Light soda ash (kg / bag)',
  },
  {
    address: 'B1',
    value: 'Dense Soda (kg / bag)',
  },
  {
    address: 'C1',
    value: 'Remarks',
  },
  {
    address: 'A2',
    value: '25',
  },
  {
    address: 'B2',
    value: '',
  },
  {
    address: 'C2:C5',
    value: 'The use of composite woven bags, flexible container bags or bulk packaging',
  },
  {
    address: 'A3',
    value: '40',
  },
  {
    address: 'B3',
    value: '50',
  },
  {
    address: 'A4',
    value: '750',
  },
  {
    address: 'B4',
    value: '1000',
  },
  {
    address: 'A5',
    value: 'Bulk',
  },
  {
    address: 'B5',
    value: 'Bulk',
  },
];

function* matchAll(str: string, regexp: RegExp) {
  const flags = regexp.global ? regexp.flags : regexp.flags + 'g';
  const re = new RegExp(regexp, flags);
  let match;
  while ((match = re.exec(str))) {
    yield match;
  }
}

const letterToPosition = (letter: string) => letter.charCodeAt(0) - A_LETTER_CHAR_CODE;

const mapCells = (cells: Cell[]) => {
  return cells.map((cell): HandledCell => {
    if (SINGLE_CELL_ADDRESS_REG_EXP.test(cell.address)) {
      // если одиночная клетка
      const matchResult = Array.from(matchAll(cell.address, SINGLE_CELL_ADDRESS_REG_EXP)!)[0];

      const letter = matchResult[1];
      const position = parseInt(matchResult[2]);

      return {
        ...cell,
        address: [letterToPosition(letter), position - 1],
      };
    } else {
      // если клетка - область
      const matchResult = Array.from(matchAll(cell.address, RANGE_CELL_ADDRESS_REG_EXP)!)[0];

      const aLetter = matchResult[1];
      const aPosition = parseInt(matchResult[2]);
      const zLetter = matchResult[3];
      const zPosition = parseInt(matchResult[4]);

      return {
        ...cell,
        address: [letterToPosition(aLetter), aPosition - 1],
        size: {
          width: letterToPosition(zLetter) - letterToPosition(aLetter) + 1,
          height: zPosition - aPosition + 1,
        },
      };
    }
  });
};

const getTableSize = (cells: HandledCell[]): RenderMatrixSize => {
  return cells.reduce(
    (currentSize, cell) => {
      if (cell?.size) {
        // если рендж
        return [
          Math.max(cell.size.width + cell.address[0], currentSize[0]),
          Math.max(cell.size.height + cell.address[1], currentSize[1]),
        ];
      } else {
        // если обычная клетка
        return [Math.max(currentSize[0], cell.address[0] + 1), Math.max(currentSize[1], cell.address[1] + 1)];
      }
    },
    [0, 0]
  );
};

const generateRenderMatrix = (cells: HandledCell[], size: RenderMatrixSize) => {
  const [width, height] = size;

  const renderMatrix: Array<Array<HandledCell | undefined>> = Array.from({
    length: height,
  }).map(() => Array.from({ length: width }));

  cells.forEach(cell => {
    const [xPos, yPos] = cell.address;
    renderMatrix[yPos][xPos] = cell;
  });

  return renderMatrix;
};

const renderData = mapCells(table);
const size = getTableSize(renderData);
const renderMatrix = generateRenderMatrix(renderData, size);

console.log({ renderData, size, renderMatrix });

export default function SpecsTable() {
  return (
    <div className="App">
      <table className="table">
        <tbody>
          {renderMatrix.map(row => {
            return (
              <tr>
                {row.map(cell => {
                  if (!cell) return null;

                  if (cell?.size) {
                    return (
                      <td rowSpan={cell.size.height} colSpan={cell.size.width}>
                        {cell.value}
                      </td>
                    );
                  }

                  return <td>{cell.value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
