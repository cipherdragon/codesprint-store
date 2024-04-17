export default function awaitable(fn: Promise<any>) {
    return fn.then(data => [data, null]).catch(err => [null, err])
}