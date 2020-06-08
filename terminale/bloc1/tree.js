
class TreeNode {
  constructor(value){
    this.value = value;
    this.descendents = [];
  }

  __to_dot(){
    let dot = "";
    if (this.descendents.length > 0) {
        dot += this.value.toString() + '[xlabel=" "];\n';
      this.descendents.forEach((node, i) => {
        if (node != null)
          dot += this.value.toString() + ' -> ' + node.value + ';\n' + node.__to_dot();
      });
    }
    return dot;
  }
  to_dot(){
    let dot = 'digraph G { \n';
    dot += this.__to_dot();
    dot += '}';
    return dot;
  }
}

class BinaryTreeNode extends TreeNode {
  static VISITE = function(node){
    console.log(node.value);
  }

  constructor(value, left = null, right = null){
    super(value);
    this.descendents.push(left);
    this.descendents.push(right);
  }

  parcoursPrefixe(traitement = BinaryTreeNode.VISITE) {
    traitement(this);
    if (this.descendents[0] != null)
      this.descendents[0].parcoursPrefixe(traitement);
    if (this.descendents[1] != null)
      this.descendents[1].parcoursPrefixe(traitement);
  }

  parcoursPostfixe(traitement = BinaryTreeNode.VISITE) {
    if (this.descendents[0] != null)
      this.descendents[0].parcoursPostfixe(traitement);
    if (this.descendents[1] != null)
      this.descendents[1].parcoursPostfixe(traitement);
    traitement(this);
  }

  parcoursInfixe(traitement = BinaryTreeNode.VISITE) {
    if (this.descendents[0] != null)
      this.descendents[0].parcoursInfixe(traitement);
    traitement(this);
    if (this.descendents[1] != null)
      this.descendents[1].parcoursInfixe(traitement);
  }
}
