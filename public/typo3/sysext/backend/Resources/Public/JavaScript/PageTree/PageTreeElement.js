/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
var __createBinding=this&&this.__createBinding||(Object.create?function(e,t,i,o){void 0===o&&(o=i),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[i]}})}:function(e,t,i,o){void 0===o&&(o=i),e[o]=t[i]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),__decorate=this&&this.__decorate||function(e,t,i,o){var n,s=arguments.length,r=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(r=(s<3?n(r):s>3?n(t,i,r):n(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r},__importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&__createBinding(t,e,i);return __setModuleDefault(t,e),t},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","lit","lit/decorators","lit/directives/until","TYPO3/CMS/Core/lit-helper","./PageTree","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Backend/Storage/Persistent","../ContextMenu","d3-selection","TYPO3/CMS/Backend/Enum/KeyTypes","../SvgTree","../Tree/DragDrop","../Modal","../Severity"],(function(e,t,i,o,n,s,r,a,d,l,h,p,c,g,u,m){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PageTreeNavigationComponent=t.EditablePageTree=t.navigationComponentName=void 0,a=__importDefault(a),d=__importDefault(d),h=__importStar(h),t.navigationComponentName="typo3-backend-navigation-component-pagetree";let v=class extends r.PageTree{selectFirstNode(){this.selectNode(this.nodes[0])}sendChangeCommand(e){let t="",i=0;e.target&&(i=e.target.identifier,"after"===e.position&&(i=-i)),"new"===e.command?t="&data[pages][NEW_1][pid]="+i+"&data[pages][NEW_1][title]="+encodeURIComponent(e.name)+"&data[pages][NEW_1][doktype]="+e.type:"edit"===e.command?t="&data[pages]["+e.uid+"]["+e.nameSourceField+"]="+encodeURIComponent(e.title):"delete"===e.command?(e.uid===window.fsMod.recentIds.web&&this.selectFirstNode(),t="&cmd[pages]["+e.uid+"][delete]=1"):t="cmd[pages]["+e.uid+"]["+e.command+"]="+i,this.requestTreeUpdate(t).then(e=>{e&&e.hasErrors?(this.errorNotification(e.messages,!1),this.nodesContainer.selectAll(".node").remove(),this.updateVisibleNodes(),this.nodesRemovePlaceholder()):this.refreshOrFilterTree()})}switchFocusNode(e){this.nodeIsEdit||this.switchFocus(this.getNodeElement(e))}nodesUpdate(e){return super.nodesUpdate.call(this,e).call(this.initializeDragForNode())}updateNodeBgClass(e){return super.updateNodeBgClass.call(this,e).call(this.initializeDragForNode())}initializeDragForNode(){return this.dragDrop.connectDragHandler(new P(this,this.dragDrop))}removeEditedText(){const e=h.selectAll(".node-edit");if(e.size())try{e.remove(),this.nodeIsEdit=!1}catch(e){}}appendTextElement(e){let t=0;return super.appendTextElement(e).on("click",(e,i)=>{"0"!==i.identifier?1==++t&&setTimeout(()=>{1===t?this.selectNode(i):this.editNodeLabel(i),t=0},300):this.selectNode(i)})}sendEditNodeLabelCommand(e){const t="&data[pages]["+e.identifier+"]["+e.nameSourceField+"]="+encodeURIComponent(e.newName);this.requestTreeUpdate(t,e).then(t=>{t&&t.hasErrors?this.errorNotification(t.messages,!1):e.name=e.newName,this.refreshOrFilterTree()})}requestTreeUpdate(e,t=null){return this.nodesAddPlaceholder(t),new a.default(top.TYPO3.settings.ajaxUrls.record_process).post(e,{headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).then(e=>e.resolve()).catch(e=>{this.errorNotification(e,!0)})}editNodeLabel(e){e.allowEdit&&(this.removeEditedText(),this.nodeIsEdit=!0,h.select(this.svg.node().parentNode).append("input").attr("class","node-edit").style("top",()=>e.y+this.settings.marginTop+"px").style("left",e.x+this.textPosition+5+"px").style("width",this.settings.width-(e.x+this.textPosition+20)+"px").style("height",this.settings.nodeHeight+"px").attr("type","text").attr("value",e.name).on("keydown",t=>{const i=t.keyCode;if(i===p.KeyTypesEnum.ENTER||i===p.KeyTypesEnum.TAB){const i=t.target.value.trim();this.nodeIsEdit=!1,this.removeEditedText(),i.length&&i!==e.name&&(e.nameSourceField=e.nameSourceField||"title",e.newName=i,this.sendEditNodeLabelCommand(e))}else i===p.KeyTypesEnum.ESCAPE&&(this.nodeIsEdit=!1,this.removeEditedText())}).on("blur",t=>{if(!this.nodeIsEdit)return;const i=t.target.value.trim();i.length&&i!==e.name&&(e.nameSourceField=e.nameSourceField||"title",e.newName=i,this.sendEditNodeLabelCommand(e)),this.removeEditedText()}).node().select())}};v=__decorate([o.customElement("typo3-backend-navigation-component-pagetree-tree")],v),t.EditablePageTree=v;let f=class extends i.LitElement{constructor(){super(...arguments),this.mountPointPath=null,this.configuration=null,this.refresh=()=>{this.tree.refreshOrFilterTree()},this.setMountPoint=e=>{this.setTemporaryMountPoint(e.detail.pageId)},this.selectFirstNode=()=>{this.tree.selectFirstNode()},this.toggleExpandState=e=>{const t=e.detail.node;t&&d.default.set("BackendComponents.States.Pagetree.stateHash."+t.stateIdentifier,t.expanded?"1":"0")},this.loadContent=e=>{const t=e.detail.node;if(!(null==t?void 0:t.checked))return;top.window.fsMod.recentIds.web=t.identifier,top.window.fsMod.currentBank=t.stateIdentifier.split("_")[0],top.window.fsMod.navFrameHighlightedID.web=t.stateIdentifier;let i="?";-1!==top.window.currentSubScript.indexOf("?")&&(i="&"),top.TYPO3.Backend.ContentContainer.setUrl(top.window.currentSubScript+i+"id="+t.identifier)},this.showContextMenu=e=>{const t=e.detail.node;t&&l.show(t.itemType,parseInt(t.identifier,10),"tree","","",this.tree.getNodeElement(t))},this.selectActiveNode=e=>{const t=window.fsMod.navFrameHighlightedID.web;let i=e.detail.nodes;e.detail.nodes=i.map(e=>(e.stateIdentifier===t&&(e.checked=!0),e))}}connectedCallback(){super.connectedCallback(),document.addEventListener("typo3:pagetree:refresh",this.refresh),document.addEventListener("typo3:pagetree:mountPoint",this.setMountPoint),document.addEventListener("typo3:pagetree:selectFirstNode",this.selectFirstNode)}disconnectedCallback(){document.removeEventListener("typo3:pagetree:refresh",this.refresh),document.removeEventListener("typo3:pagetree:mountPoint",this.setMountPoint),document.removeEventListener("typo3:pagetree:selectFirstNode",this.selectFirstNode),super.disconnectedCallback()}createRenderRoot(){return this}render(){return i.html`
      <div id="typo3-pagetree" class="svg-tree">
        ${n.until(this.renderTree(),this.renderLoader())}
      </div>
    `}getConfiguration(){if(null!==this.configuration)return Promise.resolve(this.configuration);const e=top.TYPO3.settings.ajaxUrls.page_tree_configuration;return new a.default(e).get().then(async e=>{const t=await e.resolve("json");return this.configuration=t,this.mountPointPath=t.temporaryMountPoint||null,t})}renderTree(){return this.getConfiguration().then(e=>i.html`
          <div>
            <typo3-backend-navigation-component-pagetree-toolbar id="typo3-pagetree-toolbar" class="svg-toolbar" .tree="${this.tree}"></typo3-backend-navigation-component-pagetree-toolbar>
            <div id="typo3-pagetree-treeContainer" class="navigation-tree-container">
              ${this.renderMountPoint()}
              <typo3-backend-navigation-component-pagetree-tree id="typo3-pagetree-tree" class="svg-tree-wrapper" .setup=${e} @svg-tree:initialized=${()=>{this.tree.dragDrop=new y(this.tree),this.toolbar.tree=this.tree,this.tree.addEventListener("typo3:svg-tree:expand-toggle",this.toggleExpandState),this.tree.addEventListener("typo3:svg-tree:node-selected",this.loadContent),this.tree.addEventListener("typo3:svg-tree:node-context",this.showContextMenu),this.tree.addEventListener("typo3:svg-tree:nodes-prepared",this.selectActiveNode)}}></typo3-backend-navigation-component-pagetree-tree>
            </div>
          </div>
          ${this.renderLoader()}
        `)}renderLoader(){return i.html`
      <div class="svg-tree-loader">
        <typo3-backend-icon identifier="spinner-circle-light" size="large"></typo3-backend-icon>
      </div>
    `}unsetTemporaryMountPoint(){this.mountPointPath=null,d.default.unset("pageTree_temporaryMountPoint").then(()=>{this.tree.refreshTree()})}renderMountPoint(){return null===this.mountPointPath?i.html``:i.html`
      <div class="node-mount-point">
        <div class="node-mount-point__icon"><typo3-backend-icon identifier="actions-document-info" size="small"></typo3-backend-icon></div>
        <div class="node-mount-point__text">${this.mountPointPath}</div>
        <div class="node-mount-point__icon mountpoint-close" @click="${()=>this.unsetTemporaryMountPoint()}" title="${s.lll("labels.temporaryDBmount")}">
          <typo3-backend-icon identifier="actions-close" size="small"></typo3-backend-icon>
        </div>
      </div>
    `}setTemporaryMountPoint(e){new a.default(this.configuration.setTemporaryMountPointUrl).post("pid="+e,{headers:{"Content-Type":"application/x-www-form-urlencoded","X-Requested-With":"XMLHttpRequest"}}).then(e=>e.resolve()).then(e=>{e&&e.hasErrors?(this.tree.errorNotification(e.message,!0),this.tree.updateVisibleNodes()):(this.mountPointPath=e.mountPointPath,this.tree.refreshOrFilterTree())}).catch(e=>{this.tree.errorNotification(e,!0)})}};__decorate([o.property({type:String})],f.prototype,"mountPointPath",void 0),__decorate([o.query(".svg-tree-wrapper")],f.prototype,"tree",void 0),__decorate([o.query("typo3-backend-navigation-component-pagetree-toolbar")],f.prototype,"toolbar",void 0),f=__decorate([o.customElement(t.navigationComponentName)],f),t.PageTreeNavigationComponent=f;let D=class extends c.Toolbar{constructor(){super(...arguments),this.tree=null}initializeDragDrop(e){var t,i,o;(null===(o=null===(i=null===(t=this.tree)||void 0===t?void 0:t.settings)||void 0===i?void 0:i.doktypes)||void 0===o?void 0:o.length)&&this.tree.settings.doktypes.forEach(t=>{if(t.icon){const i=this.querySelector('[data-tree-icon="'+t.icon+'"]');h.select(i).call(this.dragToolbar(t,e))}else console.warn("Missing icon definition for doktype: "+t.nodeType)})}updated(e){e.forEach((e,t)=>{"tree"===t&&null!==this.tree&&this.initializeDragDrop(this.tree.dragDrop)})}render(){var e,t,o;return i.html`
      <div class="tree-toolbar">
        <div class="svg-toolbar__menu">
          <div class="svg-toolbar__search">
              <input type="text" class="form-control form-control-sm search-input" placeholder="${s.lll("tree.searchTermInfo")}">
          </div>
          <button class="btn btn-default btn-borderless btn-sm" @click="${()=>this.refreshTree()}" data-tree-icon="actions-refresh" title="${s.lll("labels.refresh")}">
              <typo3-backend-icon identifier="actions-refresh" size="small"></typo3-backend-icon>
          </button>
        </div>
        <div class="svg-toolbar__submenu">
          ${(null===(o=null===(t=null===(e=this.tree)||void 0===e?void 0:e.settings)||void 0===t?void 0:t.doktypes)||void 0===o?void 0:o.length)?this.tree.settings.doktypes.map(e=>i.html`
                <div class="svg-toolbar__drag-node" data-tree-icon="${e.icon}" data-node-type="${e.nodeType}"
                     title="${e.title}" tooltip="${e.tooltip}">
                  <typo3-backend-icon identifier="${e.icon}" size="small"></typo3-backend-icon>
                </div>
              `):""}
        </div>
      </div>
    `}dragToolbar(e,t){return t.connectDragHandler(new b(e,this.tree,t))}};__decorate([o.property({type:v})],D.prototype,"tree",void 0),D=__decorate([o.customElement("typo3-backend-navigation-component-pagetree-toolbar")],D);class y extends g.DragDrop{changeNodePosition(e,t=""){const i=this.tree.nodes,o=this.tree.settings.nodeDrag.identifier;let n=this.tree.settings.nodeDragPosition,s=e||this.tree.settings.nodeDrag;if(o===s.identifier&&"delete"!==t)return null;if(n===g.DraggablePositionEnum.BEFORE){const t=i.indexOf(e),o=this.setNodePositionAndTarget(t);if(null===o)return null;n=o.position,s=o.target}return{node:this.tree.settings.nodeDrag,uid:o,target:s,position:n,command:t}}setNodePositionAndTarget(e){const t=this.tree.nodes,i=t[e].depth;e>0&&e--;const o=t[e].depth,n=this.tree.nodes[e];if(o===i)return{position:g.DraggablePositionEnum.AFTER,target:n};if(o<i)return{position:g.DraggablePositionEnum.INSIDE,target:n};for(let o=e;o>=0;o--){if(t[o].depth===i)return{position:g.DraggablePositionEnum.AFTER,target:this.tree.nodes[o]};if(t[o].depth<i)return{position:g.DraggablePositionEnum.AFTER,target:t[o]}}return null}}class b{constructor(e,t,i){this.startDrag=!1,this.startPageX=0,this.startPageY=0,this.id="",this.name="",this.tooltip="",this.icon="",this.isDragged=!1,this.id=e.nodeType,this.name=e.title,this.tooltip=e.tooltip,this.icon=e.icon,this.tree=t,this.dragDrop=i}dragStart(e){return this.isDragged=!1,this.startDrag=!1,this.startPageX=e.sourceEvent.pageX,this.startPageY=e.sourceEvent.pageY,!0}dragDragged(e){return!!this.dragDrop.isDragNodeDistanceMore(e,this)&&(this.startDrag=!0,!1===this.isDragged&&(this.isDragged=!0,this.dragDrop.createDraggable("#icon-"+this.icon,this.name)),this.dragDrop.openNodeTimeout(),this.dragDrop.updateDraggablePosition(e),this.dragDrop.changeNodeClasses(e),!0)}dragEnd(e){return!!this.startDrag&&(this.isDragged=!1,this.dragDrop.removeNodeDdClass(),!(!0!==this.tree.settings.allowDragMove||!this.tree.hoveredNode||!this.tree.isOverSvg)&&(this.tree.settings.canNodeDrag&&this.addNewNode({type:this.id,name:this.name,tooltip:this.tooltip,icon:this.icon,position:this.tree.settings.nodeDragPosition,target:this.tree.hoveredNode}),!0))}addNewNode(e){const t=e.target;let i=this.tree.nodes.indexOf(t);const o={command:"new"};if(o.type=e.type,o.identifier="-1",o.target=t,o.parents=t.parents,o.parentsStateIdentifier=t.parentsStateIdentifier,o.depth=t.depth,o.position=e.position,o.name=void 0!==e.title?e.title:TYPO3.lang["tree.defaultPageTitle"],o.y=o.y||o.target.y,o.x=o.x||o.target.x,this.tree.nodeIsEdit=!0,e.position===g.DraggablePositionEnum.INSIDE&&(o.depth++,o.parents.unshift(i),o.parentsStateIdentifier.unshift(this.tree.nodes[i].stateIdentifier),this.tree.nodes[i].hasChildren=!0,this.tree.showChildren(this.tree.nodes[i])),e.position!==g.DraggablePositionEnum.INSIDE&&e.position!==g.DraggablePositionEnum.AFTER||i++,e.icon&&(o.icon=e.icon),o.position===g.DraggablePositionEnum.AFTER){const e=this.dragDrop.setNodePositionAndTarget(i);null!==e&&(o.position=e.position,o.target=e.target)}this.tree.nodes.splice(i,0,o),this.tree.setParametersNode(),this.tree.prepareDataForVisibleNodes(),this.tree.updateVisibleNodes(),this.tree.removeEditedText(),h.select(this.tree.svg.node().parentNode).append("input").attr("class","node-edit").style("top",o.y+this.tree.settings.marginTop+"px").style("left",o.x+this.tree.textPosition+5+"px").style("width",this.tree.settings.width-(o.x+this.tree.textPosition+20)+"px").style("height",this.tree.settings.nodeHeight+"px").attr("text","text").attr("value",o.name).on("keydown",e=>{const t=e.target,i=e.keyCode;if(13===i||9===i){this.tree.nodeIsEdit=!1;const e=t.value.trim();e.length?(o.name=e,this.tree.removeEditedText(),this.tree.sendChangeCommand(o)):this.removeNode(o)}else 27===i&&(this.tree.nodeIsEdit=!1,this.removeNode(o))}).on("blur",e=>{if(this.tree.nodeIsEdit&&this.tree.nodes.indexOf(o)>-1){const t=e.target.value.trim();t.length?(o.name=t,this.tree.removeEditedText(),this.tree.sendChangeCommand(o)):this.removeNode(o)}}).node().select()}removeNode(e){let t=this.tree.nodes.indexOf(e);this.tree.nodes[t-1].depth==e.depth||this.tree.nodes[t+1]&&this.tree.nodes[t+1].depth==e.depth||(this.tree.nodes[t-1].hasChildren=!1),this.tree.nodes.splice(t,1),this.tree.setParametersNode(),this.tree.prepareDataForVisibleNodes(),this.tree.updateVisibleNodes(),this.tree.removeEditedText()}}class P{constructor(e,t){this.startDrag=!1,this.startPageX=0,this.startPageY=0,this.isDragged=!1,this.nodeIsOverDelete=!1,this.tree=e,this.dragDrop=t}dragStart(e){const t=e.subject;return!0===this.tree.settings.allowDragMove&&0!==t.depth&&(this.dropZoneDelete=null,t.allowDelete&&(this.dropZoneDelete=this.tree.nodesContainer.select('.node[data-state-id="'+t.stateIdentifier+'"]').append("g").attr("class","nodes-drop-zone").attr("height",this.tree.settings.nodeHeight),this.nodeIsOverDelete=!1,this.dropZoneDelete.append("rect").attr("height",this.tree.settings.nodeHeight).attr("width","50px").attr("x",0).attr("y",0).on("mouseover",()=>{this.nodeIsOverDelete=!0}).on("mouseout",()=>{this.nodeIsOverDelete=!1}),this.dropZoneDelete.append("text").text(TYPO3.lang.deleteItem).attr("dx",5).attr("dy",15),this.dropZoneDelete.node().dataset.open="false",this.dropZoneDelete.node().style.transform=this.getDropZoneCloseTransform(t)),this.startPageX=e.sourceEvent.pageX,this.startPageY=e.sourceEvent.pageY,this.startDrag=!1,!0)}dragDragged(e){const t=e.subject;if(!this.dragDrop.isDragNodeDistanceMore(e,this))return!1;if(this.startDrag=!0,!0!==this.tree.settings.allowDragMove||0===t.depth)return!1;this.tree.settings.nodeDrag=t;const i=this.tree.svg.node().querySelector('.node-bg[data-state-id="'+t.stateIdentifier+'"]'),o=this.tree.svg.node().parentNode.querySelector(".node-dd");return this.isDragged||(this.isDragged=!0,this.dragDrop.createDraggable(this.tree.getIconId(t),t.name),i.classList.add("node-bg--dragging")),this.tree.settings.nodeDragPosition=!1,this.dragDrop.openNodeTimeout(),this.dragDrop.updateDraggablePosition(e),t.isOver||this.tree.hoveredNode&&-1!==this.tree.hoveredNode.parentsStateIdentifier.indexOf(t.stateIdentifier)||!this.tree.isOverSvg?(this.dragDrop.addNodeDdClass(o,"nodrop"),this.tree.isOverSvg||this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none"),this.dropZoneDelete&&"true"!==this.dropZoneDelete.node().dataset.open&&this.tree.isOverSvg&&this.animateDropZone("show",this.dropZoneDelete.node(),t)):this.tree.hoveredNode?this.dropZoneDelete&&"false"!==this.dropZoneDelete.node().dataset.open&&this.animateDropZone("hide",this.dropZoneDelete.node(),t):(this.dragDrop.addNodeDdClass(o,"nodrop"),this.tree.nodesBgContainer.selectAll(".node-bg__border").style("display","none")),this.dragDrop.changeNodeClasses(e),!0}dragEnd(e){const t=e.subject;if(this.dropZoneDelete&&"true"===this.dropZoneDelete.node().dataset.open){const e=this.dropZoneDelete;this.animateDropZone("hide",this.dropZoneDelete.node(),t,()=>{e.remove(),this.dropZoneDelete=null})}else this.dropZoneDelete=null;if(!this.startDrag||!0!==this.tree.settings.allowDragMove||0===t.depth)return!1;const i=this.tree.hoveredNode;if(this.isDragged=!1,this.dragDrop.removeNodeDdClass(),t.isOver||i&&-1!==i.parentsStateIdentifier.indexOf(t.stateIdentifier)||!this.tree.settings.canNodeDrag||!this.tree.isOverSvg){if(this.nodeIsOverDelete){const e=this.dragDrop.changeNodePosition(i,"delete");if(null===e)return!1;if(this.tree.settings.displayDeleteConfirmation){u.confirm(TYPO3.lang.deleteItem,TYPO3.lang["mess.delete"].replace("%s",e.node.name),m.warning,[{text:TYPO3.lang["labels.cancel"]||"Cancel",active:!0,btnClass:"btn-default",name:"cancel"},{text:TYPO3.lang["cm.delete"]||"Delete",btnClass:"btn-warning",name:"delete"}]).on("button.clicked",t=>{"delete"===t.target.name&&this.tree.sendChangeCommand(e),u.dismiss()})}else this.tree.sendChangeCommand(e)}}else{const e=this.dragDrop.changeNodePosition(i,"");if(null===e)return!1;let t=e.position===g.DraggablePositionEnum.INSIDE?TYPO3.lang["mess.move_into"]:TYPO3.lang["mess.move_after"];t=t.replace("%s",e.node.name).replace("%s",e.target.name),u.confirm(TYPO3.lang.move_page,t,m.warning,[{text:TYPO3.lang["labels.cancel"]||"Cancel",active:!0,btnClass:"btn-default",name:"cancel"},{text:TYPO3.lang["cm.copy"]||"Copy",btnClass:"btn-warning",name:"copy"},{text:TYPO3.lang["labels.move"]||"Move",btnClass:"btn-warning",name:"move"}]).on("button.clicked",t=>{const i=t.target;"move"===i.name?(e.command="move",this.tree.sendChangeCommand(e)):"copy"===i.name&&(e.command="copy",this.tree.sendChangeCommand(e)),u.dismiss()})}return!0}getDropZoneOpenTransform(e){return"translate("+((parseFloat(this.tree.svg.style("width"))||300)-58-e.x)+"px, -10px)"}getDropZoneCloseTransform(e){return"translate("+((parseFloat(this.tree.svg.style("width"))||300)-e.x)+"px, -10px)"}animateDropZone(e,t,i,o=null){t.classList.add("animating"),t.dataset.open="show"===e?"true":"false";let n=[{transform:this.getDropZoneCloseTransform(i)},{transform:this.getDropZoneOpenTransform(i)}];"show"!==e&&(n=n.reverse());const s=function(){t.style.transform=n[1].transform,t.classList.remove("animating"),o&&o()};"animate"in t?t.animate(n,{duration:300,easing:"cubic-bezier(.02, .01, .47, 1)"}).onfinish=s:s()}}}));