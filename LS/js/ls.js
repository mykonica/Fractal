function randomColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);

    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function lsObject(lsParameters) {
    this.org_x = lsParameters['org']['x'];
    this.org_y = lsParameters['org']['y'];
    this.steps = lsParameters['steps'];
    this.angle = lsParameters['angle'];
    this.initial = lsParameters['initial'];
    this.rules = lsParameters['rules'];
    this.length = lsParameters['length'];

    this.getLSExpression = getLSExpression;

    function getLSExpression() {
        if (this.expression) {

        } else {
            this.expression = new String(this.initial);

            for (var stepIndex = 0; stepIndex < this.steps; stepIndex++) {
                for (var ruleIndex = 0; ruleIndex < this.rules.length; ruleIndex++) {
                    var source = this.rules[ruleIndex]['source'];
                    var target = this.rules[ruleIndex]['target'];
                    this.expression = this.expression.replace(source, target);
                }
            }
        }

        return this.expression;
    }
}

function paintLS(lsobject) {
    window.context.save();

    var expression = lsobject.getLSExpression();

    var x = 0;
    var y = 0;
    var lastx = x;
    var lasty = y;
    var angle = 0.0;
    var length = lsobject.length;

    window.context.translate(window.canvas.width / 2 + lsobject.org_x, window.canvas.height - lsobject.org_y);

    // if (true) {
    //     window.context.strokeStyle = '#FF00FF';
    //     window.context.moveTo(-200, -2);
    //     window.context.lineTo(200, -2);
    //     window.context.moveTo(0, 0);
    //     window.context.lineTo(0, -800);
    //     window.context.stroke();
    // }



    window.context.fillStyle = 'rgb(255, 0, 0)';
    window.context.strokeStyle = 'rgb(255, 0, 0)';

    var angleRatio = 2 * Math.PI / 360;
    window.context.moveTo(x, y);
    if (true) {
        window.context.fillStyle = '#FF00FF';
        window.context.fillRect(-20, -20, 40, 40);
    }
    for (var i = 0; i < expression.length; i++) {
        switch (expression[i]) {
            case 'F':
                x = x + length * Math.cos(angleRatio * angle);
                y = y + length * Math.sin(angleRatio * angle);
                window.context.lineTo(x, y);
                break;
            case 'f':
                x = x + length * Math.cos(angleRatio * angle);
                y = y + length * Math.sin(angleRatio * angle);
                window.context.moveTo(x, y);
                break;
            case '+':
                angle += lsobject.angle;
                if (angle > 360) {
                    angle -= 360;
                }

                if (angle < 0) {
                    angle += 360;
                }
                break;
            case '-':
                angle -= lsobject.angle;
                if (angle > 360) {
                    angle -= 360;
                }

                if (angle < 0) {
                    angle += 360;
                }
                break;
            case '[':
                lastx = x;
                lasty = y;
                break;
            case ']':
                x = lastx;
                y = lasty;
                break;
            default:
                break;
        }
    }

    window.context.stroke();


    //window.context.translate(-window.canvas.width / 2 - org_x, -window.canvas.height + org_y);
    window.context.restore();
}
