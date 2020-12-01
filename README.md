# electrum-cli

`electrum-cli` is a very simple CLI tool that allows you to quickly make requests to an electrum server.

## Installation

```
npm install -g electrum-cli
```

## Usage

```
Usage: electrum-cli [options] <method> [methodArgs...]

Options:
  --server <server>    electrum server to connect to over SSL ({host}:{port})
  --version <version>  electrum protocol version to use (default: "1.4")
  --btc                use default server for BTC (electrumx-core.1209k.com:50002)
  --bch                use default server for BCH (bch.imaginary.cash:50002)
  --help               display help for command
```

`electrum-cli` can be used to call any of the protocol methods supported by the specified electrum version and server and will output the response from the server.

To inspect the full specification, see the [ElectrumX documentation](https://electrumx-spesmilo.readthedocs.io/) for the general documentation, or the [Fulcrum documentation](https://electrum-cash-protocol.readthedocs.io/) for Bitcoin Cash specific methods.

### Supported chains
`electrum-cli` allows you to specify a custom server and protocol version. As such, it is compatible with all cryptocurrencies that support the electrum protocol, such as BTC, BCH and LTC. For convenience, you can use the `--btc` or `--bch` flags to connect to a default electrum server for the BTC and BCH networks, respectively. These default servers are `electrumx-core.1209k.com:50002` for BTC and `bch.imaginary.cash:50002` for BCH.

### Shell aliases
If you find yourself using the same requests often, it can be useful to set up aliases in your Bash/Zsh/Fish config.

```bash
alias get-bch-tx="electrum-cli --bch blockchain.transaction.get"
alias get-btc-block-header="electrum-cli --btc blockchain.block.header"
```

### Examples

#### Request the genesis block header on BTC
```
$ electrum-cli --btc blockchain.block.header 0
0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c
```

#### Request the Hal Finney transaction on BCH
```
$ electrum-cli --bch blockchain.transaction.get f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16
0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000
```

```json
$ electrum-cli --bch blockchain.transaction.get f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16 true
{
  "txid": "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
  "hash": "f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16",
  "version": 1,
  "size": 275,
  "vsize": 275,
  "weight": 1100,
  "locktime": 0,
  "vin": [
    {
      "txid": "0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9",
      "vout": 0,
      "scriptSig": {
        "asm": "304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d09[ALL]",
        "hex": "47304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901"
      },
      "sequence": 4294967295
    }
  ],
  "vout": [
    {
      "value": 10,
      "n": 0,
      "scriptPubKey": {
        "asm": "04ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84c OP_CHECKSIG",
        "hex": "4104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac",
        "type": "pubkey"
      }
    },
    {
      "value": 40,
      "n": 1,
      "scriptPubKey": {
        "asm": "0411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3 OP_CHECKSIG",
        "hex": "410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac",
        "type": "pubkey"
      }
    }
  ],
  "hex": "0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000",
  "blockhash": "00000000d1145790a8694403d4063f323d499e655c83426834d4ce2f8dd4a2ee",
  "confirmations": 658741,
  "time": 1231731025,
  "blocktime": 1231731025
}
```

#### Broadcast a transaction on BTC using a custom server
```
$ electrum-cli --server btc.litepay.ch:50002 blockchain.transaction.broadcast 0100000001c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704000000004847304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901ffffffff0200ca9a3b00000000434104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac00286bee0000000043410411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3ac00000000
f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16
```

#### List all UTXOs for an address on BCH using a custom version
```json
$ electrum-cli --bch --version 1.4.3 blockchain.address.listunspent bitcoincash:prc3anhlptnca2pc7p8c7700546d5kamgsklagnkrs
[
  {
    "height": 0,
    "tx_hash": "26511b1110aa16fcaefd703c8daee5b2e9932559f5cbf234aad57aec879d2029",
    "tx_pos": 0,
    "value": 21000000
  }
]
```
