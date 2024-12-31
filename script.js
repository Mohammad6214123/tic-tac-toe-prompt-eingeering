let fields = [
    null, null, null,
    null, null, null,
    null, null, null,
  ];
  
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
  ];
  
  let currentPlayer = 'circle';
  
  function init() {
    render();
  }
  
  function render() {
    const contentDiv = document.getElementById('content');
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        let symbol = '';
        if (fields[index] === 'circle') {
          symbol = generateCircleSVG();
        } else if (fields[index] === 'cross') {
          symbol = generateCrossSVG();
        }
        tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table>';
    contentDiv.innerHTML = tableHtml;
  }
  
function restartGame(){
    fields = [
        null, null, null,
        null, null, null,
        null, null, null,
      ];

      render();
}  
  function handleClick(cell, index) {
    if (fields[index] === null) {
      fields[index] = currentPlayer;
      cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
      cell.onclick = null;
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
  
      if (isGameFinished()) {
        const winCombination = getWinningCombination();
        if (winCombination) {
          drawWinningLine(winCombination);
        } 
        }
      }
    }
  
  
  function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
  }
  
  function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
      const [a, b, c] = WINNING_COMBINATIONS[i];
      if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
        return WINNING_COMBINATIONS[i];
      }
    }
    return null;
  }
  
  function generateCircleSVG() {
    const color = '#00B0EF';
    return `
      <svg>
        <circle cx="35" cy="35" r="30" stroke="${color}" stroke-width="5" fill="none">
          <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
        </circle>
      </svg>
    `;
  }
  
  function generateCrossSVG() {
    const color = '#FFC000';
    return `
      <svg>
        <line x1="0" y1="0" x2="70" y2="70" stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="0; 70" dur="200ms" />
          <animate attributeName="y2" values="0; 70" dur="200ms" />
        </line>
        <line x1="70" y1="0" x2="0" y2="70" stroke="${color}" stroke-width="5">
          <animate attributeName="x2" values="70; 0" dur="200ms" />
          <animate attributeName="y2" values="0; 70" dur="200ms" />
        </line>
      </svg>
    `;
  }
  
  function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;
  
    const allCells = document.querySelectorAll("td");
    const startCell = allCells[combination[0]];
    const endCell = allCells[combination[2]];
  
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();
  
    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
  
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.position = 'absolute';
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2}px`;
    line.style.left = `${startRect.left + startRect.width / 2}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = "0 0";
  
    document.body.appendChild(line);
  }
  
  init();
  