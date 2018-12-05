def getSegmentRange(segments, n):
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
        self.xLen = 0            # The width of the matrix
        self.yLen = len(matrix)  # The heigth of the matrix

        for yPos in range(len(matrix)):
            yVal = matrix[yPos]

            thisY = []
            for xPos in range(len(yVal)):
                # This gets the range of segment n
                segmentRange = getSegmentRange(segments, matrix[yPos][xPos][0])

                # This adds the range to the current row's list
                # if in the config [<segment_num>, <reversed>]
                # reversed == true, revese the list before adding it
                thisY += reversed(segmentRange) if matrix[yPos][xPos][1] else segmentRange

            # This just finds the longest row in the matrix
            if (len(thisY) > self.xLen):
                self.xLen = len(thisY)

            self.matrix.append(thisY)

    def get(self, x, y):
        """ Return the value of a place in the matrix given x and y coordinates """
        return self.matrix[y][x]
    
    def dump(self):
        nSpacers = (self.xLen*6) // 2 - 6
        print( ("=" * nSpacers) + "Matrix dump" + ("=" * nSpacers) )

        for y in self.matrix:
            thisYLine = ""
            for x in y:
                thisYLine +=  ( ' ' * (5 - len(str(x))) ) + str(x) + ' '
            print(thisYLine)

        print("=" * (self.xLen*6))


if __name__ == "__main__":
    testMatrix = Matrix(
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [
            [[0, False], [1, True], [2, False]],
            [[3, True], [4, False], [5, True]],
            [[6, False], [7, True], [8, False]]
        ]
    )
