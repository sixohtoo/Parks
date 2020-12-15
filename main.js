class Spot {
    constructor(row, col, info) {
        this.colour = 'white'
        this.row = row
        this.col = col
        this.dirs = [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]]
        this.info = info
        this.init_info()
        this.neighbours = []
        this.get_neighbours()
        this.total_rows = parseInt($('#size').find(':selected').text())
        this.mode = parseInt($('#mode').find(':selected').text())
        this.type == 'EMPTY'
    }

    init_info() {
        self.info.colours = {}
        self.info.row = {}
        self.info.cols = {}
        self.info.coords = {}
    }

    update_colour(colour) {
        if (!(colour in this.info.coords)) {
            this.info.coords[colour] = []
        }
        if (this.colour != 'white') {
            const index = this.info.coords[colour].indexOf(this);
            this.info.coords[this.colour].splice(index, 1)
        }
        this.colour = colour
        this.info[colours][colour] = 0
        if (colour in this.info.coords) {
            this.info.coords[colour].append(this)
        }
        else {
            this.info.coords[colour] = [this] // DIFFERENT FROM PYTHON IDK IF THIS IS CORRECT OR PYTHON IS
        }
    }

    get_neighbours() {
        row = this.row
        col = this.col
        for (let i = 0; i < this.dirs; i++) {
            y = this.dirs[0]
            x = this.dirs[1]
            if (0 <= row + y < self.total_rows && 0 <= col + x < self.total_rows) {
                self.neighbours.append([row + y, col + x])
            }
        }
    }

    is_tree() {
        return this.type == 'TREE'
    }

    is_empty() {
        return this.type == 'EMPTY'
    }

    make_tree() {
        this.type = 'TREE'
        if (this.colour in this.info.colours) {
            this.info.colours[this.colour] += 1
        }
        else {
            this.info.colours[this.colour] = 1
        }
        if (this.row in this.info.rows) {
            this.info.rows[row] += 1
        }
        else {
            this.info.rows[row] = 1
        }
        if (this.col in this.info.rows) {
            this.info.rows[row] += 1
        }
        else {
            this.info.rows[row] = 1
        }
    }

    make_empty() {
        if (this.type == 'TREE') {
            this.info.colours[this.colour] -= 1
            this.info.rows[this.colour] -= 1
            this.info.cols[this.colour] -= 1
        }
        this.type = "EMPTY"
    }

    trees_in_row() {
        if (this.row in this.info.rows) {
            return this.info.rows[this.row]
        }
        else {
            return 0
        }
    }

    trees_in_col() {
        if (this.col in this.info.cols) {
            return this.info.cols[this.col]
        }
        else {
            return 0
        }
    }

    trees_in_colour() {
        if (this.colour in this.info.colours) {
            return this.info.colours[this.colour]
        }
        else {
            return 0
        }
    }

    check_valid(grid) {
        if (this.type != EMPTY) {
            return false
        }
        if (this.trees_in_row >= this.mode) {
            return false
        }
        if (this.trees_in_col >= this.mode) {
            return false
        }
        if (this.trees_in_colour >= this.mode) {
            return false
        }
        for (let i = 0; i < this.neighbours.length; i++) {
            row = this.neighbours[i][0]
            col = this.neighbours[i][1]
            if (grid[row][col].type == 'TREE') {
                return false
            }
        }
        return true
    }
}

class Grid {
    constructor(rows, info) {
        this.rows = rows
        this.info = info
        this.grid = grid
        this.make_grid()
    }

    make_grid() {
        for (let i = 0; i < this.rows; i++) {
            self.grid.append([])
            for (let j = 0; j < this.rows; j++) {
                spot = new Spot(i, j, this.info)
                this.grid[i].append(spot)
            }
        }
    }

    get_spot(row, col) {
        return this.grid[row][col]
    }

    check_covered() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (self.grid[i][j].colour == "white") {
                    return false
                }
            }
        }
        return true
    }

    clear_board() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.rows; j++) {
                if (spot.is_tree()) {
                    spot.make_empty()
                }
            }
        }
    }

    compare_spots(spot1, spot2) {
        if (spot1.row < spot2.row) {
            return -1
        }
        if (spot1.row < spot2.row) {
            return 1
        }
        return 0
    }

    compare_arrays(arr1, arr2) {
        if (arr1.length < arr2.length) {
            return -1
        }
        if (arr1.length > arr2.length) {
            return 1
        }
        return 0
    }

    get_size_list() {
        size = []
        colour = this.info.coords
        for (let i = 0; i < this.rows; i++) {
            colour[i].sort(this.compare_spots)
            size.append(colour[i])
        }
        size.sort(this.compare_arrays)
        return size
    }

    solve(finished, colour, size_list) {
        if (colour == size_list.length) {
            finished[0] = true
            console.log('done')
            return
        }
        current = Date.now() / 1000
        if (current - TIME > 0.5) {
            // GOTTA DRAW THIS STUFF SOMEHOW
            TIME = current
        }
        let area = size_list[colour]
        for (let i = 0; i < area.length; i++) {
            let spot = area[i]
            if (spot.is_valid(this.grid) && !finished[0]) {
                spot.make_tree()
                PLACED++
                if (spot.mode == 2) {
                    for (let j = i; j < area.length; j++) {
                        square = area[j]
                        if (square.check_valid(this.grid)) {
                            square.make_tree()
                            this.solve(finished, colour + 1, size_list)
                            if (!finished[0]) {
                                square.make_empty()
                            }
                        }
                    }
                }
                else {
                    this.solve(finished, colour + 1, size_list)
                }
                if (!finished[0]) {
                    spot.make_empty()
                }
            }
        }
    }
}

function addColourBar(num) {
    $('#colours div').remove()
    
    let colours = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'light_blue', 'dirty_pink', 'navy', 'ugly_yellow', 'brown', 'pink']
    for (let i = 0; i < num; i++) {
        const colour = colours[i]
        $('#colours').append(`<div class="${colour}"></div>`)
    }
    $('#colours div').css('width', `${600 / num}px`)
}

function addRows(num) {
    $('#wrapper div').remove()
    $('#wrapper').css('grid-template-columns', `repeat(${num}, 1fr)`)
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            $('#wrapper').append('<div class="white"></div>')
        }
    }
}

function changeFunc() {
    const num = parseInt($('#size').find(':selected').text())
    addRows(num)
    addColourBar(num)
    
}

function changeColour(event) {
    // const colour = event.target.classList[0]
    $('.selected_colour').removeClass('selected_colour')
    paint_colour = event.target.classList[0]
    event.target.classList.add('selected_colour')
}

function updateGrid(event) {
    const current_classes = event.target.classList
    let old_colour = ''
    for (let i = 0; i < current_classes.length; i++) {
        if (current_classes[i] != "tree") {
            old_colour = current_classes[i]
            break
        }
    }
    event.target.classList.remove(old_colour)
    event.target.classList.add(paint_colour)
}

function updateLeftClick() {
    left_click = left_click != true ? true : false
}

function checkUpdateGrid(event) {
    if (left_click) {
        updateGrid(event)
    }
}

function disableLeftClick(event) {
    left_click = false
}

function checkStartSolver() {
    if ($('#wrapper div.white').toArray().length) {
        console.log('starting')
        rows = parseInt($('#size').find(':selected').text())
        let info = {}
        grid = new Grid(rows, info)
        grid.make_grid()
        PLACED = 0
        START = Date.now() / 1000
        const size_list = grid.get_size_list()
        solve([false], 0, size_list)
        console.log('Time taken:', Math.floor(Date.now() / 1000 - START))
        console.log('Trees placed:', PLACED)
    }
}

PLACED = 0
let TIME = Date.now() / 1000
let paint_colour = 'white'
let left_click = false
size.onchange = changeFunc;
colours.onclick = changeColour;
wrapper.onclick = updateGrid;
wrapper.onmousedown = updateLeftClick;
wrapper.onmousemove = checkUpdateGrid;
wrapper.onmouseup = updateLeftClick;
body.onmouseup = disableLeftClick;
solve.onclick = checkStartSolver
