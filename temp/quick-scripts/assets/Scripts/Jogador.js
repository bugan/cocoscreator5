(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Jogador.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd3299InP/hAoKRk6tw0FpIQ', 'Jogador', __filename);
// Scripts/Jogador.js

"use strict";

var Teclado = require("Teclado");
cc.Class({
    extends: cc.Component,

    properties: {
        tiro: cc.Prefab,
        vidaMaxima: cc.Float,

        _vidaAtual: cc.Float,
        _direcao: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,
        _camera: cc.Node,
        _posicaoArma: cc.Node,
        _audioTiro: cc.AudioSource,
        _direcaoMouse: cc.Vec2
    },

    onLoad: function onLoad() {

        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._audioTiro = this.getComponent(cc.AudioSource);
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.calcularDirecaoMouse, this);
        this._camera = cc.find("Camera");
        this.node.on("SofreDano", this.sofrerDano, this);
        this._vidaAtual = this.vidaMaxima;
        this._posicaoArma = this.node.children[0];
        this._direcaoMouse = cc.Vec2.UP;
    },

    update: function update(deltaTime) {
        this._movimentacao.setDirecao(this._direcao);
        this._movimentacao.andarPraFrente();

        this._direcao = cc.Vec2.ZERO;

        if (Teclado.estaPressionada(cc.KEY.a)) {
            this._direcao.x -= 1;
        }
        if (Teclado.estaPressionada(cc.KEY.d)) {
            this._direcao.x += 1;
        }

        if (Teclado.estaPressionada(cc.KEY.s)) {
            this._direcao.y -= 1;
        }
        if (Teclado.estaPressionada(cc.KEY.w)) {
            this._direcao.y += 1;
        }

        this.atualizaAnimacao();
    },

    atualizaAnimacao: function atualizaAnimacao() {
        this._controleAnimacao.mudaAnimacao(this._direcaoMouse, this.estadoAtual());
    },

    sofrerDano: function sofrerDano(evento) {
        this._vidaAtual -= evento.detail.dano;
        var eventoPerdeVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        eventoPerdeVida.setUserData({ vidaAtual: this._vidaAtual, vidaMaxima: this.vidaMaxima });
        this.node.dispatchEvent(eventoPerdeVida);
        if (this._vidaAtual < 0) {
            var jogoAcabou = new cc.Event.EventCustom("JogoAcabou", true);
            this.node.dispatchEvent(jogoAcabou);
        }
    },

    estadoAtual: function estadoAtual(event) {
        var estado = void 0;
        if (this._direcao.mag() == 0) {
            estado = "Parado";
        } else {
            estado = "Andar";
        }
        return estado;
    },

    calcularDirecaoMouse: function calcularDirecaoMouse(event) {
        var posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        posicaoMouse = this._canvas.convertToNodeSpaceAR(posicaoMouse);
        var posicaoJogadora = this._camera.convertToNodeSpaceAR(this.node.position);

        var direcao = posicaoMouse.sub(posicaoJogadora);
        this._direcaoMouse = direcao;
    },

    atirar: function atirar(event) {
        var direcao = this._direcaoMouse;
        var disparo = cc.instantiate(this.tiro);
        disparo.getComponent("Tiro").iniciliza(this.node.parent, this._posicaoArma.position.add(this.node.position), direcao);

        this._audioTiro.play();
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Jogador.js.map
        