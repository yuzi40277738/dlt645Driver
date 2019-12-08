const expect = require('chai').use(require('chai-as-promised')).expect;
const dltParser = require('../src/DltParser');

describe('Sync Encoder test', () => {
    it('should encode correct from cmd to buf', () => {
        const cmd = {
            sn: '3411001043',
            cmd: '11',
            data: {
                status:true,
                propertyName: 'elecUa',
                value:0
            }
        }
        let encodedData = Buffer.from([0xfe, 0xfe, 0xfe, 0xfe, 0x68, 0x43, 0x10, 0x00, 0x11, 0x34,
            0x00, 0x68, 0x11, 0x04, 0x33, 0x34, 0x34, 0x35, 0x4d, 0x16]);
        expect(dltParser.cmdToBuf(cmd)).to.eql(encodedData);
    });

    it('should return undefined if cmd of wrong format', () => {
        const cmd =undefined;
        expect(dltParser.cmdToBuf(cmd)).to.eql(undefined);
    });
});

describe('Sync Decoder test', () => {
    it('should decode correct from buf to cmd', () => {
        let cmd = {
            sn: '3411001043',
            cmd: '91',
            data: {
                status:true,
                propertyName: 'elecUa',
                value:2297
            }
        }
        let buf= Buffer.from([0xfe ,0xfe ,0xfe ,0xfe ,0x68 ,0x43 ,0x10 ,0x00 ,0x11 ,0x34 ,0x00 ,
            0x68 ,0x91 ,0x06 ,0x33 ,0x34 ,0x34 ,0x35 ,0xca ,0x55 ,0xee ,0x16]);
        expect(dltParser.bufToCmd(buf)).to.eql(cmd);
    });

    it('should return error message if buf of wrong format', () => {
        const buf =undefined;
        let cmd={    
                cmd: '',
                data: {
                    status: false,
                    propertyName:'errorCode',
                    value: 'TypeError: Cannot read property \'indexOf\' of undefined'
                }
            }
        
        expect(dltParser.bufToCmd(buf)).to.eql(cmd);
    });
});