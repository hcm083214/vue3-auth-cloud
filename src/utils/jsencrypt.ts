import JSEncrypt from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALzLyst5JqCj67FQabLmqnhakycACovu
rRBXaEqglxpIInJx9BE4EyaGLC4iBvoaI2F0O4jfcEwhvF8W9cS/VWMCAwEAAQ==`

const privateKey = `MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAvMvKy3kmoKPrsVBp
suaqeFqTJwAKi+6tEFdoSqCXGkgicnH0ETgTJoYsLiIG+hojYXQ7iN9wTCG8Xxb1
xL9VYwIDAQABAkAiOqiX3207brzKtxOS1fNOQs2vInjHCgzii5ZjAV6j6uRAFycK
EXjIfv/RB6zLxNtsyUsXv9MStr5Ba7e9ycdhAiEA6sW+ABWQSILIRF8SSgFb2Sji
9nhHgJLokGFDSkKMUVkCIQDN3da+6ZbsxJTVaJp+M3CdhboUOI/GTVQ2M012IVep
GwIhAL4IgdsfmUKYWfK94df1cZs99Tj78ySnxYfYstcRNvNBAiEAvjn0yyhxi4sC
tEgaKe9Camw9S54QTH78B7FULIoWxG0CIEFCzE2dgalAVKGehm/trp9DhaSGVAJs
9teCvKK2N9RE`

// 加密
export function encrypt(txt: string) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt: string) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey) // 设置私钥
    return encryptor.decrypt(txt) // 对数据进行解密
}

