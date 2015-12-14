def prufer_to_tree(a):
    tree = []
    T = range(0, len(a)+2)

    # the degree of each node is how many times it appears
    # in the sequence
    deg = [1]*len(T)
    for i in a: deg[i] += 1

    # for each node label i in a, find the first node j with degree 1 and add
    # the edge (j, i) to the tree
    for i in a:
        for j in T:
            if deg[j] == 1:
                tree.append((i,j))
                # decrement the degrees of i and j
                deg[i] -= 1
                deg[j] -= 1
                break

    last = [x for x in T if deg[x] == 1]
    tree.append((last[0],last[1]))

    return tree

