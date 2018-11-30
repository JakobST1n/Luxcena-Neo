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
        self.matrix = []
        for yPos in range(len(matrix)):
            yVal = matrix[yPos]

            thisY = []
            for xPos in range(len(yVal)):
                if matrix[yPos][xPos][1] == True:
                    thisY += reversed(getSegmentRange(segments, matrix[yPos][xPos][0]))
                else:
                    thisY += getSegmentRange(segments, matrix[yPos][xPos][0])
            self.matrix.append(thisY)

    def get(self, x, y):
        """ Return the value of a place in the matrix given x and y coordinates """
        return self.matrix[y][x]

if __name__ == "__main__":
    testMatrix = Matrix(
        [2, 2, 2, 2, 2, 2, 2, 2, 2],
        [
            [[0, False], [1, True], [2, False]],
            [[3, True], [4, False], [5, True]],
            [[6, False], [7, True], [8, False]]
        ]
    )
