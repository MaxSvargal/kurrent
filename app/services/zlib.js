import zlib from 'zlib'

export const compress = input =>
  new Promise((resolve, reject) =>
    zlib.deflateRaw(new Buffer(JSON.stringify(input), 'utf8'), (err, res) =>
      err ? reject(err) : resolve(res.toString('base64'))))

export const decompress = input =>
  new Promise((resolve, reject) =>
    zlib.inflateRaw(new Buffer(input, 'base64'), (err, res) =>
      err ? reject(err) : resolve(JSON.parse(res))))
