def get_segment_range(segments, n):
    """ Return a list of all the actual led-numbers in a segment """
    # Sum all the segments prior to the one we are looking for
    i = 0
    start = 0
    while True:
        if i >= n: break
        start += segments[i]  # Add number of leds in this segment to the start-index
        i += 1

    # Add all numbers in the segment we are looking for to a list
    i = start
    breakPoint = i + segments[n]
    range = []
    while True:
        range.append(i)
        i += 1
        if i >= breakPoint: break
    return range


class Matrix:

    def __init__(self, segments, matrix):
        self.matrix = []         # Holds the matrix
        self.x_len = 0            # The width of the matrix
        self.y_len = len(matrix)  # The heigth of the matrix

        for y_pos in range(len(matrix)):
            y_val = matrix[y_pos]

            this_y = []
            for x_pos in range(len(y_val)):
                # This gets the range of segment n
                segment_range = get_segment_range(segments, matrix[y_pos][x_pos][0])

                # This adds the range to the current row's list
                # if in the config [<segment_num>, <reversed>]
                # reversed == true, revese the list before adding it
                this_y += reversed(segment_range) if matrix[y_pos][x_pos][1] else segment_range

            # This just finds the longest row in the matrix
            if (len(this_y) > self.x_len):
                self.x_len = len(this_y)

            self.matrix.append(this_y)

    def get(self, x, y):
        """ Return the value of a place in the matrix given x and y coordinates """
        return self.matrix[y][x]
    
    def dump(self):
        n_spacers = (self.x_len*6) // 2 - 6
        print( ("=" * n_spacers) + "Matrix dump" + ("=" * n_spacers) )

        for y in self.matrix:
            this_y_line = ""
            for x in y:
                this_y_line +=  ( ' ' * (5 - len(str(x))) ) + str(x) + ' '
            print(this_y_line)

        print("=" * (self.x_len*6))


if __name__ == "__main__":
    test_matrix = Matrix(
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [
            [[0, False], [1, True], [2, False]],
            [[3, True], [4, False], [5, True]],
            [[6, False], [7, True], [8, False]]
        ]
    )
