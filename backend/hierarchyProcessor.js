function processHierarchy(data) {

    const validEdges = [];
    const invalidEntries = [];
    const duplicateEdges = [];

    const regex = /^[A-Z]->[A-Z]$/;
    const seen = new Set();

    for (let edge of data) {

        edge = edge.trim();

        if (!regex.test(edge)) {
            invalidEntries.push(edge);
            continue;
        }

        const [parent, child] = edge.split("->");

        if (parent === child) {
            invalidEntries.push(edge);
            continue;
        }

        if (seen.has(edge)) {

            if (!duplicateEdges.includes(edge)) {
                duplicateEdges.push(edge);
            }

            continue;
        }

        seen.add(edge);
        validEdges.push(edge);
    }

    const childParent = new Map();
    const filteredEdges = [];

    for (const edge of validEdges) {

        const [parent, child] = edge.split("->");

        if (!childParent.has(child)) {
            childParent.set(child, parent);
            filteredEdges.push(edge);
        }
    }

    const graph = {};

    for (const edge of filteredEdges) {

        const [parent, child] = edge.split("->");

        if (!graph[parent]) {
            graph[parent] = [];
        }

        if (!graph[child]) {
            graph[child] = [];
        }

        graph[parent].push(child);
    }
    const children = new Set();

for (const edge of filteredEdges) {
    const [parent, child] = edge.split("->");
    children.add(child);
}

let root = null;

for (const node in graph) {
    if (!children.has(node)) {
        root = node;
        break;
    }
}

const visited = new Set();
const recStack = new Set();

let cycleFound = false;

for (const node in graph) {

    if (!visited.has(node)) {

        if (hasCycle(node, visited, recStack)) {
            cycleFound = true;
            break;
        }
    }
}

function hasCycle(node, visited, recStack) {

    visited.add(node);
    recStack.add(node);

    for (const child of graph[node]) {

        if (!visited.has(child)) {

            if (hasCycle(child, visited, recStack)) {
                return true;
            }

        } else if (recStack.has(child)) {
            return true;
        }
    }

    recStack.delete(node);

    return false;
}

function buildTree(node) {

    const obj = {};

    for (const child of graph[node]) {
        obj[child] = buildTree(child);
    }

    return obj;
}
function getDepth(node) {

    if (graph[node].length === 0) {
        return 1;
    }

    let maxDepth = 0;

    for (const child of graph[node]) {
        maxDepth = Math.max(
            maxDepth,
            getDepth(child)
        );
    }

    return maxDepth + 1;
}

let tree = {};

if (!cycleFound && root) {
    tree[root] = buildTree(root);
}
let depth = 0;

if (!cycleFound && root) {
    depth = getDepth(root);
}

return {
    root,
    depth,
    has_cycle: cycleFound,
    tree,
    filtered_edges: filteredEdges,
    graph,
    invalid_entries: invalidEntries,
    duplicate_edges: duplicateEdges
};
}

module.exports = processHierarchy;