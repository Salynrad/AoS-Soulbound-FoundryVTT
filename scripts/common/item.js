export class AgeOfSigmarItem extends Item {

    prepareData() {
        super.prepareData()

    }


    async sendToChat() {
        const item = new CONFIG.Item.documentClass(this.data._source);
        if (item.data.img.includes("/unknown")) {
            item.data.img = null;
        }

        const html = await renderTemplate("systems/age-of-sigmar-soulbound/template/chat/item.html", {item, data : item.data.data});
        const chatData = {
            user: game.user._id,
            rollMode: game.settings.get("core", "rollMode"),
            content: html,
        };
        if (["gmroll", "blindroll"].includes(chatData.rollMode)) {
            chatData.whisper = ChatMessage.getWhisperRecipients("GM");
        } else if (chatData.rollMode === "selfroll") {
            chatData.whisper = [game.user];
        }
        ChatMessage.create(chatData);
    }


        // **************** GETTERS *******************

        /************** ITEMS *********************/
        get isGoal() {return this.type === "talent"}

        get isGoal() {return this.type === "goal"}
    
        get isConnection() {return this.type === "connection"}
    
        get isWound() {return this.type === "wound"}
    
        get isSpell() {return this.type === "spell"}
    
        get isMiracle() {return this.type === "miracle"}
    
        get isPower() {return this.isSpell || this.isMiracle}
    
        /************** PARTY ITEMS *********************/
        get isShortGoal() {return this.type === "goal" && this.data.data.type === "short"}
    
        get isLongGoal() {return this.type === "goal"  && this.data.data.type === "long"}
    
        get isAlly() {return this.type === "ally"}
    
        get isEnemy() {return this.type === "enemy"}
    
        get isResource() {return this.type === "resource"}
    
        get isRumour() {return this.type === "rumour"}
    
        get isFear() {return this.type === "fear"}
    
        get isThreat() {return this.type === "threat"}
    
        get isActive() {return this.data.data.state === "active"}
    
        /************** GEAR *********************/
        get isEquipped() { return  this.data.data.state === "equipped"}
    
        get isArmour() { return  this.type === "armour"}
    
        get isWeapon() { return  this.type === "weapon"}
    
        get isAethericDevice() { return  this.type === "aethericDevice"}
    
        get isAttack() { return  this.isWeapon || (item.isAethericDevice && item.data.damage)}
    
        get isRune() { return  this.type === "rune"}
    
        get isEquipment() { return  this.type === "equipment"}
}