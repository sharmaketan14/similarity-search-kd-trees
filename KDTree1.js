class KDPoint {
    constructor(dims) {
        this.points = new Array(dims);
    }
}

class KDNode {
    constructor(point) {
        this.point = point;
        this.left = null;
        this.right = null;
    }
}

class KDTree {
    constructor(root, dims) {
        this.dims = dims;
        this.root = root
    }

    insert_node(root, point, depth) {
        if(!root) {
            return new KDNode(point);
        }

        const curr_hyperplane = depth % this.dims;
        
        if(root.point.points[curr_hyperplane] > point.points[curr_hyperplane]) {
            root.left = this.insert_node(root.left, point, depth + 1);
        } else {
            root.right = this.insert_node(root.right, point, depth + 1);
        }

        return root;
    }

    print_tree(root, depth = 0) {
        if(!root) {
            return;
        }

        console.log(`Depth: ${depth}, Point: ${JSON.stringify(root.point.points)}`);
        this.print_tree(root.left, depth + 1);
        this.print_tree(root.right, depth + 1);

        return;
    }

    are_same(point1, point2) {
        for(let i = 0; i < this.dims; i++) {
            if(point1[i] != point2[i]) {
                return false;
            }
        }
        return true;
    }

    search_node(root, point, depth) {
        if(!root) {
            return false;
        }
        if(this.are_same(root.point.points, point.points)) {
            return true;
        }

        const curr_hyperplane = depth % this.dims;

        let right_found = false;
        let left_found = false;

        if(root.point.points[curr_hyperplane] > point.points[curr_hyperplane]) {
            left_found = this.search_node(root.left, point, depth + 1);
        } else {
            right_found = this.search_node(root.right, point, depth + 1);
        }

        return right_found || left_found;
    }

    eucledian_dist(point1, point2) {
        let dist = 0;
        for(let point = 0; point < this.dims; point++) {
            const diff = point1[point] - point2[point];
            dist += diff * diff;
        }
        return Math.sqrt(dist);
    }

    nearest_neighbour_search_node(root, point, depth) {
        if(!root) {
            return [1e9, null];
        }
        const curr_hyperplane = depth % this.dims;
        
        let right_best = [1e9, null];
        let left_best = [1e9, null];
        
        if(root.point.points[curr_hyperplane] > point.points[curr_hyperplane]) {
            left_best = this.nearest_neighbour_search_node(root.left, point, depth + 1);
        } else {
            right_best = this.nearest_neighbour_search_node(root.right, point, depth + 1);
        }

        const orthogonal_dist = Math.sqrt((root.point.points[curr_hyperplane] - point.points[curr_hyperplane]) * (root.point.points[curr_hyperplane] - point.points[curr_hyperplane]));
        const euc_dist = this.eucledian_dist(point.points, root.point.points);

        let curr_best = [1e9, null];

        if(curr_best[0] > left_best[0]) {
            curr_best = left_best;
        }
        if(curr_best[0] > right_best[0]) {
            curr_best = right_best
        }
        if(curr_best[0] > euc_dist) {
            curr_best = [euc_dist, root]
        }

        if(orthogonal_dist < curr_best[0]) {
            if(root.point.points[curr_hyperplane] > point.points[curr_hyperplane]) {
                const a = this.nearest_neighbour_search_node(root.right, point, depth + 1)
                if(curr_best[0] > a[0]) {
                    curr_best = a;
                }
            } else {
                const b = Math.min(curr_best[0], this.nearest_neighbour_search_node(root.left, point, depth + 1)[0]);
                if(curr_best[0] > b[0]) {
                    curr_best = b;
                }
            }
        }

        return curr_best;
    }
};

const point_f = [
    [479, 449],
    [70, 721],
    [343, 858],
    [207, 313],
    [751, 177],
    [888, 585],
    [615, 40],
]
const points = []

for(point of point_f) {
    new_point = new KDPoint(2);
    new_point.points = point;
    points.push(new_point);
}

let root = null

tree = new KDTree(root, 2)

for(point of points) {
    root = tree.insert_node(root, point, 0);
}

tree.print_tree(root, 0);


search_point = new KDPoint(2)
search_point.points = [800,600]

exist_node = tree.search_node(root, search_point, 0);

console.log(exist_node)

search_point = new KDPoint(2)
search_point.points = [200,600]

closest_dist = tree.nearest_neighbour_search_node(root, search_point, 0);

console.log(closest_dist[0], closest_dist[1].point)