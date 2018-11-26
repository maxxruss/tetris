    //Глобальные переменные___________________
var gameIsRunning = false;
var d = document;
var figureTimer;
var gameTable = d.querySelector(".gameTable");
var infoTable = d.querySelector(".infoTable");
var table = d.createElement("div");
var finishInfo = d.querySelector(".finishInfo");
var r = 1;
var c = 5;
var rDefault = 1;
var cDefault = 5;
var rI = 2;
var cI = 2;
var rotate = 0;
var actual = 0;
var oldUnit;
var oldInfoUnit;
var foundation;
var unit1, unit2, unit3, unit4;
var unitInfo1, unitInfo2, unitInfo3, unitInfo4;
var randomFigure;
/**Фигуры*/
var Z = 0;
var S = 1;
var J = 2;
var L = 3;
var I = 4;
var T = 5;
var O = 6;
var figureNumber;
var checkCell;
var checkScore;
var scoreCount = 0;
var scoreCountOld = 0;
var speed = 900;
var level = 1;
var pauseCount = 1;

/**генерация игрового поля*/
table.classList.add("table");
gameTable.appendChild(table);
for (var i = 0; i < 20; i++) {
    var row = d.createElement("tr");
    row.classList.add("row" + i);
    for (var j = 0; j < 10; j++) {
        var cell = d.createElement("td");
        cell.classList.add("cell");
        cell.classList.add("cell-" + i + "-" + j);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

/**генерация инфо поля*/
var nextFigureBlock = d.createElement("div");
nextFigureBlock.classList.add("nextFigureBlock");
infoTable.appendChild(nextFigureBlock);
var nextFigureLabel = d.createElement("div");
nextFigureLabel.classList.add("nextFigureLabel");
nextFigureLabel.innerHTML = "NEXT FIGURE";
infoTable.appendChild(nextFigureLabel);
for (var i = 0; i < 4; i++) {
    var rowInfo = d.createElement("tr");
    rowInfo.classList.add("rowInfo");
    for (var j = 0; j < 5; j++) {
        var cellInfo = d.createElement("td");
        cellInfo.classList.add("cellInfo");
        cellInfo.classList.add("cellInfo-" + i + "-" + j);
        rowInfo.appendChild(cellInfo);
    }
    nextFigureBlock.appendChild(rowInfo);
}
infoTable.appendChild(nextFigureBlock);
var scoreInfoLabel = d.createElement("div");
scoreInfoLabel.classList.add("scoreInfoLabel");
scoreInfoLabel.innerHTML = "SCORE";
infoTable.appendChild(scoreInfoLabel);
var scoreInfo = d.createElement("div");
scoreInfo.classList.add("scoreInfo");
scoreInfo.innerHTML = scoreCount;
infoTable.appendChild(scoreInfo);
var levelInfoLabel = d.createElement("div");
levelInfoLabel.classList.add("levelInfoLabel");
levelInfoLabel.innerHTML = "LEVEL";
infoTable.appendChild(levelInfoLabel);
var levelInfo = d.createElement("div");
levelInfo.classList.add("levelInfo");
levelInfo.innerHTML = level;
infoTable.appendChild(levelInfo);
var pauseButton = d.querySelector(".buttonPause");
pauseButton.value = "Пауза";

/**События кнопок*/
d.querySelector(".buttonStart").addEventListener("click", startGame);
d.querySelector(".buttonPause").addEventListener("click", pause);
addEventListener("keydown", controlFigure);

/**Начало игры*/
function startGame() {
    gameIsRunning = true;
    delOldInfoUnit();
    clearAll();
    generateRandomFigure();
    r = rDefault;
    c = cDefault;
    rI = 2;
    cI = 2;
    rotate = 0;
    actual = 0;
    speed = 900;
    level = 1;
    levelInfo.innerHTML = level;
    scoreCount = 0;
    scoreInfo.innerHTML = scoreCount;
    finishInfo.innerHTML = "";
    figureNumber = randomFigure;
    clearInterval(figureTimer);
    figure[figureNumber][rotate](r, c);
    createNewUnit();
    figureTimer = setInterval(move, speed);
    generateRandomFigure();
    createInfoFigure[randomFigure](2, 2);
    showInfoFigure();
}

/**Движение фигур вниз**/
function move() {
    /**Проверка на возможность падать вниз фигуре*/
    r++;
    if (r === 20 || checkFoundation()) {
        foundation = d.querySelectorAll(".figureUnit" + actual);
        for (i = 0; i < foundation.length; i++) {
            foundation[i].classList.remove("figureUnit" + actual);
            foundation[i].classList.add("foundation");
        }
        checkFullRow();
        newCycle();
    }
    if (gameIsRunning = true) {
        delOldUnit();
        createNewUnit();
    }
}

/***Генератор случайной фигуры***/
function generateRandomFigure() {
    randomFigure = Math.round(0 + (Math.random() * 6));
}

/**Построение фигуры в info блоке*/
var createInfoFigure = {
    0: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + (cI + 1));
        unitInfo2 = d.querySelector(".cellInfo-" + rI + "-" + cI);
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
    },
    1: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + (cI - 1));
        unitInfo2 = d.querySelector(".cellInfo-" + rI + "-" + cI);
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 1));
    },
    2: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + (cI + 1));
        unitInfo2 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 1));
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
    },
    3: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + (cI - 1));
        unitInfo2 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 1));
    },
    4: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
        unitInfo2 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 1));
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 2));
    },
    5: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + cI);
        unitInfo2 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI + 1));
    },
    6: function (rI, cI) {
        unitInfo1 = d.querySelector(".cellInfo-" + rI + "-" + cI);
        unitInfo2 = d.querySelector(".cellInfo-" + rI + "-" + (cI - 1));
        unitInfo3 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + (cI - 1));
        unitInfo4 = d.querySelector(".cellInfo-" + (rI - 1) + "-" + cI);
    }
};

/**Удаление фигуры в инфо блоке*/
function delOldInfoUnit() {
    oldInfoUnit = d.querySelectorAll(".figureInfoUnit");
    for (i = 0; i < oldInfoUnit.length; i++) {
        oldInfoUnit[i].classList.remove("figureInfoUnit");
    }
}

/**Прорисовка фигуры в инфо блоке*/
function showInfoFigure() {
    unitInfo1.classList.add("figureInfoUnit");
    unitInfo2.classList.add("figureInfoUnit");
    unitInfo3.classList.add("figureInfoUnit");
    unitInfo4.classList.add("figureInfoUnit");
}

/***Создание новой фигуры***/
function createNewUnit() {
    actual++;
    if (unit1 != null) {
        unit1.classList.add("figureUnit" + actual);
        unit1.classList.add("figureUnit");
    }
    if (unit2 != null) {
        unit2.classList.add("figureUnit" + actual);
        unit2.classList.add("figureUnit");
    }
    if (unit3 != null) {
        unit3.classList.add("figureUnit" + actual);
        unit3.classList.add("figureUnit");
    }
    if (unit4 != null) {
        unit4.classList.add("figureUnit" + actual);
        unit4.classList.add("figureUnit");
    }
}

/**Проверка на возможность построения фигуры - при движении вниз или повороте**/
function checkFoundation() {
    figure[figureNumber][rotate](r, c);
    if (unit1 === null ||
        unit2 === null ||
        unit3 === null ||
        unit4 === null ||
        unit1.classList.contains("foundation") == true ||
        unit2.classList.contains("foundation") == true ||
        unit3.classList.contains("foundation") == true ||
        unit4.classList.contains("foundation") == true) {
        return true;
    } else {
        return false;
    }
}

/***Удаление старой фигуры***/
function delOldUnit() {
    oldUnit = d.querySelectorAll(".figureUnit" + actual);
    for (i = 0; i < oldUnit.length; i++) {
        oldUnit[i].classList.remove("figureUnit" + actual);
        oldUnit[i].classList.remove("figureUnit");
    }
}

function clearAll() {
    var clearUnit = d.querySelectorAll(".figureUnit");
    for (i = 0; i < clearUnit.length; i++) {
        clearUnit[i].classList.remove("figureUnit");
    }

    var clearFoundation = d.querySelectorAll(".foundation");
    for (i = 0; i < clearFoundation.length; i++) {
        clearFoundation[i].classList.remove("foundation");
    }
}

/***Проверка на заполнение всего ряда***/
function checkFullRow() {
    for (var f = 0; f < 20; f++) {
        checkScore = 0;
        for (i = 0; i < 10; i++) {
            checkCell = d.querySelector(".cell-" + f + "-" + i);
            if (checkCell.classList.contains("foundation")) {
                checkScore++;
                if (checkScore === 10) {
                    for (var t = 0; t < 10; t++) {
                        var checkCellFullRow = d.querySelector(".cell-" + f + "-" + t);
                        checkCellFullRow.classList.remove("foundation");
                        checkCellFullRow.classList.remove("figureUnit");
                    }
                    /**Сдвиг верхних ячеек вниз*/
                    for (var reWriteRow = f - 1; reWriteRow > 0; reWriteRow--) {
                        for (var reWriteCell = 0; reWriteCell < 10; reWriteCell++) {
                            var checkReWriteCell = d.querySelector(".cell-" + reWriteRow + "-" + reWriteCell);
                            if (checkReWriteCell.classList.contains("foundation")) {
                                checkReWriteCell.classList.remove("foundation");
                                checkReWriteCell.classList.remove("figureUnit");
                                var cellLow = d.querySelector(".cell-" + (reWriteRow + 1) + "-" + reWriteCell);
                                cellLow.classList.add("foundation");
                                cellLow.classList.add("figureUnit");
                            }
                        }
                    }
                    scoreCount += 100;
                    scoreInfo.innerHTML = scoreCount;
                    if (scoreCount >= 8900) {
                        youWin();
                    } else {
                        var scoreDifference = scoreCount - scoreCountOld;
                        if (scoreDifference === 1000) {
                            scoreCountOld = scoreCount;
                            nextLevel();
                        }
                    }
                }
            } else {
                break;
            }
        }
    }
}

/**Новый уровень через каждую 1000 очков*/
function nextLevel() {
    levelInfo.innerHTML = ++level;
    clearInterval(figureTimer);
    figureTimer = setInterval(move, speed -= 100);
    newCycle();
}

/**Контроль клавиш перемещения и переворота фигуры*/
function controlFigure(e) {
    switch (e.keyCode) {
        case (38):
            rotate++;
            if (rotate === 4) {
                rotate = 0
            }
            if (!checkFoundation()) {
                delOldUnit();
                figure[figureNumber][rotate](r, c);
                createNewUnit();
            } else {
                rotate--;
                break;
            }
            break;
        case (37):
            c--;
            if (!checkFoundation()) {
                delOldUnit();
                figure[figureNumber][rotate](r, c);
                createNewUnit();
            } else {
                c++;
                break;
            }
            break;
        case (39):
            c++;
            if (!checkFoundation()) {
                delOldUnit();
                figure[figureNumber][rotate](r, c);
                createNewUnit();
            } else {
                c--;
                break;
            }
            break;
        case (40):
            r++;
            if (!checkFoundation()) {
                delOldUnit();
                figure[figureNumber][rotate](r, c);
                createNewUnit();
            } else {
                r--;
                break;
            }
            break;
    }
}

/**Новый цикл*/
function newCycle() {
    actual = 0;
    r = rDefault;
    c = cDefault;
    rotate = 0;
    figureNumber = randomFigure;
    figure[figureNumber][rotate](r, c);
    if (unit1 === null || unit1.classList.contains("foundation") == true &&
        unit2 === null || unit2.classList.contains("foundation") == true &&
        unit3 === null || unit3.classList.contains("foundation") == true &&
        unit4 === null || unit4.classList.contains("foundation") == true) {
        youLose()
    } else {
        generateRandomFigure();
        createInfoFigure[randomFigure](2, 2);
        delOldInfoUnit();
        showInfoFigure();
    }
}

function youWin() {
    clearInterval(figureTimer);
    gameIsRunning = false;
    finishInfo.innerHTML = "Вы выиграли!"
}

function youLose() {
    clearInterval(figureTimer);
    gameIsRunning = false;
    finishInfo.innerHTML = "Вы проиграли!"
}

/**Пауза*/
function pause() {
    pauseCount++;
    if (pauseCount % 2 == 0) {
        clearInterval(figureTimer);
        pauseButton.value = "Продолжить игру";
    } else {
        figureTimer = setInterval(move, speed);
        pauseButton.value = "Пауза";
    }
}

/**Построение основных фигур*/
var figure = {
    0: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c + 1));
            unit2 = d.querySelector(".cell-" + r + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c + 1));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c + 1));
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c + 1));
            unit2 = d.querySelector(".cell-" + r + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c + 1));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c + 1));
        }
    },
    1: {
        0: function (r, c) {
            unit4 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit3 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit1 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c - 2));
        },
        2: function (r, c) {
            unit4 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit3 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit1 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c - 2));
        }
    },
    2: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + (r + 1) + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r + 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + r + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + (r + 1) + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        }

    },
    3: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 2) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c - 2));
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + r + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 2) + "-" + (c - 1));
        }
    },
    4: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + r + "-" + c);
            unit4 = d.querySelector(".cell-" + r + "-" + (c + 1));
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 2) + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 3) + "-" + c);
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + r + "-" + c);
            unit4 = d.querySelector(".cell-" + r + "-" + (c + 1));
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + c);
            unit3 = d.querySelector(".cell-" + (r - 2) + "-" + c);
            unit4 = d.querySelector(".cell-" + (r - 3) + "-" + c);
        }
    },
    5: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit2 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + (r + 1) + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + c);
            unit3 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + (r + 1) + "-" + c);
            unit2 = d.querySelector(".cell-" + (r + 1) + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r + 1) + "-" + (c - 2));
            unit4 = d.querySelector(".cell-" + r + "-" + (c - 1));
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + (r + 1) + "-" + (c - 2));
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 2));
            unit3 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 2));
        }
    },
    6: {
        0: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        1: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        2: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        },
        3: function (r, c) {
            unit1 = d.querySelector(".cell-" + r + "-" + c);
            unit2 = d.querySelector(".cell-" + r + "-" + (c - 1));
            unit3 = d.querySelector(".cell-" + (r - 1) + "-" + (c - 1));
            unit4 = d.querySelector(".cell-" + (r - 1) + "-" + c);
        }
    }
};

