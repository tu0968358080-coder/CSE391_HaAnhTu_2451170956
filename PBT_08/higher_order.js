function pipe(...fns) {
    return function (initialValue) {
        return fns.reduce((acc, fn) => fn(acc), initialValue);
    };
}

function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

async function retry(fn, maxAttempts = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (attempt === maxAttempts) break;
        }
    }
    throw lastError;
}

const processNumber = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(processNumber(5));

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
search("a");
search("ab");
search("abc");

const unstableTask = (() => {
    let count = 0;
    return async () => {
        count++;
        if (count < 3) {
            throw new Error("Lỗi kết nối");
        }
        return "Thành công!";
    };
})();

(async () => {
    try {
        const result = await retry(unstableTask, 3);
        console.log("Retry result:", result);
    } catch (err) {
        console.error("Retry failed:", err.message);
    }
})();