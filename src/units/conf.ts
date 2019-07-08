import { AdminInfo } from "../entities/AdminInfo";

class TokenDTO extends AdminInfo {
    token: string = null;
    datetime: number = null;
}
export class Conf {
    static port = 3000;
    static debug = false;
    static ignorePath = ['/login.html', '/AdminMan/Login'];
    static loginToken: TokenDTO[] = [];
    static tokendelay: number = 20 * 60 * 1000;

    static findPath(it: string): boolean {
        return Conf.ignorePath.find(v => {
            return v == it;
        }) ? true : false;
    }

    static setToken(token: string, user: AdminInfo) {
        let dto = new TokenDTO();
        dto.datetime = Date.now();
        dto.token = token;

        dto.Name = user.Name;
        dto.Account = user.Account;
        dto.JobNumber = user.JobNumber;
        dto.Password = user.Password;
        dto.PhoneNumber = user.PhoneNumber;
        dto.id = user.id;

        Conf.loginToken.push(dto);
    }

    static removeToken(token: string) {
        let _index = Conf.loginToken.findIndex(i => { return i.token == token });
        if (_index != -1) {
            Conf.loginToken.splice(_index, 1);
        }
    }

    static findToken(token: string): boolean {
        let dto = Conf.loginToken.find(v => {
            return v.token == token;
        });
        if (dto) {
            if (Date.now() - dto.datetime <= Conf.tokendelay) {
                dto.datetime = Date.now();
            } else {
                Conf.loginToken.splice(Conf.loginToken.findIndex(i => { return i.token == token }), 1);
                return false;
            }
        }
        return dto ? true : false;
    }

    static getUserByToken(token: string): AdminInfo {
        return Conf.loginToken.find(v => {
            return v.token == token;
        });
    }
}