import { get, post, dealResult, dealResultForBool } from './request'

// pdf阅读
export default {
    // 获取题录信息
    GetPdfInfo(data) {
        debugger
        return post('File/GetPdfTiluInfo', data).then(dealResult);
    },
    // 获取页面列表
    ImgLazyLoad(data) {
        return post('File/PdfTurnPage', data).then(dealResult);
    },
    // 判断文献类型
    getFileType(data){
        return post('File/IsExitFile', data).then(dealResult);
    },
    copyTextFun(data){
        return post({
            url: applicationPath + 'File/PdfCopy',
            data,
            type: 'post',
            dataType: 'json',
            async: false
        }).then(dealResult);
        // 异步会导致无法复制
        // return post('File/PdfCopy', data).then(dealResult);
    },
    //我的笔记
    GetNotes(data) {
        return post('LitNotes/GetNotesByLid', data).then(dealResult);
    },
    //参考文献，引证文献
    GetRefer(data){
        return post('LitNotes/GetPaperRefreNotes', data).then(dealResult);
    },
    GetComment(data){
        return post('LitNotes/GetAllComments', data).then(dealResult);
    },
    //获取全部标签
    GetExsistedSigns(data){
        return post('LitNotes/GetNoteExtByStudyId', data).then(dealResult);
    },
    //添加标签
    AddFileSign(data){
        return post('LitNotes/SetFileSignStudy', data).then(dealResult);
    },
    //删除标签
    DeleteFileSign(data){
        return post('LitNotes/DeleteFileSign', data).then(dealResult);
    },

    //获取本文标签
    GetLitSignsByFileCode(data){
        return post('LitNotes/GetLitSignsByFileCode', data).then(dealResult);
    },
    // 目录保存为大纲
    SavePdfCatalogToWritingOutline(data){
        return post('LitNotes/SavePdfCatalogToWritingOutline', data).then(dealResult);
    },

    // 是否具有会员权限
    IsHasNumberAuth(data){
        return post('LitNotes/IsHasNumberAuth', data).then(dealResult);
    },
    // 添加笔记
    SetNote(data){
        return post('LitNotes/AddNote', data).then(dealResult);
    },
    // 所有标签名
    GetSignNames(data){
        return get('Common/GetNoteSignNames', data).then(dealResult);
    },
    // 添加至最近阅读记录
    SetReadReocd(data){
        return post('Common/AddReadReocd', data).then(dealResult);
    },
    // 编辑笔记
    SetEditNote(data){
        return get('LitNotes/EditNote', data).then(dealResult);
    },
    // 删除笔记
    delNote(data){
        return post('LitNotes/DeleteStudyNote', data).then(dealResult);
    },
    // 添加文摘
    addCentoInfo(data){
        return post('Common/AddCentoInfo', data).then(dealResult);
    },
    //打分
    setScore(data){
        return post('Common/SetScore', data).then(dealResult);
    },
    // 全文笔记
    GetAllComments(data){
        return post('LitNotes/GetAllComments', data).then(dealResult);
    },
    //笔记汇编 type=3
    GetAssemblyList(data){
        return post('LitNotes/GetAssemblyList', data).then(dealResult);
    },
    GetAssemblyNew(data){
        return post('LitNotes/AssemblyCoorperateNew', data).then(dealResult);
    },
    // 获取专题列表
    getAllTask(data){
        return post('LitNotes/GetAllTask', data).then(dealResult);
    },
    getStudyDetail(data){
        return post('Common/GetStudyDetail', data).then(dealResult);
    },
    getFileType(data){
        return post('File/IsExitFile', data).then(dealResult);
    },
}