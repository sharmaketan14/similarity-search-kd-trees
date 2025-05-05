export class KDPoint {
    constructor(dims) {
        this.points = new Array(dims);
    }
}

export class KDNode {
    constructor(point) {
        this.point = point;
        this.left = null;
        this.right = null;
    }
}

export class KDTree {
    constructor(root, dims) {
        this.dims = dims;
        this.root = root;
        this.all_points = []
    }

    insert_node(root, point, depth) {
        if (!root) return new KDNode(point);

        const curr_hyperplane = depth % this.dims;
        if (root.point.points[curr_hyperplane] > point.points[curr_hyperplane]) {
            root.left = this.insert_node(root.left, point, depth + 1);
        } else {
            root.right = this.insert_node(root.right, point, depth + 1);
        }

        return root;
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

    brute_force_nearest_neighbour_search(point) {
        let min_dis = 1e9;
        let min_point = null;

        for(let i = 0; i < this.all_points.length; i++) {
            const point1 = new KDPoint(2)
            point1.points = this.all_points[i];
            
            const euc_dist = this.eucledian_dist(point.points, point1.points)
            if (euc_dist < min_dis) {
                min_dis = euc_dist;
                min_point = point1;
            }
        }

        const nearest_node = min_point ? new KDNode(min_point) : null;

        return [min_dis, nearest_node];
    }

    draw(ctx, node, depth = 0, xMin = 0, yMin = 0, xMax = ctx.canvas.width, yMax = ctx.canvas.height) {
        if (!node) return;

        const [x, y] = node.point.points;
        const axis = depth % 2;

        this.all_points.push([x, y])
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = axis === 0 ? "red" : "blue";

        if (axis === 0) {
            ctx.moveTo(x, yMin);
            ctx.lineTo(x, yMax);
        } else {
            ctx.moveTo(xMin, y);
            ctx.lineTo(xMax, y);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();

        if (axis === 0) {
            this.draw(ctx, node.left, depth + 1, xMin, yMin, x, yMax);
            this.draw(ctx, node.right, depth + 1, x, yMin, xMax, yMax);
        } else {
            this.draw(ctx, node.left, depth + 1, xMin, yMin, xMax, y);
            this.draw(ctx, node.right, depth + 1, xMin, y, xMax, yMax);
        }
    }
}
